import json
import os
import numpy as np
from django.contrib.sessions.backends.db import SessionStore
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse, HttpResponseNotFound
from django.shortcuts import render, redirect
from networkx.readwrite import json_graph
from cPickle import UnpicklingError
from pymote.algorithm import NodeAlgorithm
from pymote.node import Node
from pymote import read_pickle, Simulation, write_pickle
from rest_framework.decorators import api_view
from pymote_backend.settings import SESSION_FILE_PATH


def convert(o):
    if isinstance(o, Node):
        return o.id
    if isinstance(o, np.ndarray):
        return o.tolist()
    raise TypeError


def get_dict_from_net(net, tree_key=None):
    res = net.get_dic()

    res["nodes"] = []
    for n in net:
        node = n.get_dic()
        node["info"] = node.pop("1. info")
        node["communication"] = node.pop("2. communication")
        node["memory"] = node.pop("3. memory")
        node["sensors"] = node.pop("4. sensors")
        res["nodes"].append(node)

    res["links"] = json_graph.node_link_data(net)["links"]

    current_algorithm = net.get_current_algorithm()
    if isinstance(current_algorithm, NodeAlgorithm):
        res["currentAlgorithm"] = {
            "statusKeys": current_algorithm.STATUS.keys()
        }

    if tree_key is not None:
        tree_net = net.get_tree_net(tree_key)
        res["treeEdges"] = tree_net.edges()

    return res


@api_view(["POST"])
def upload_network(request):
    if request.method == "POST":
        f = request.FILES.get("file")
        if f is None:
            return JsonResponse({})

        if request.session.session_key is None:
            s = SessionStore()
            s.create()
            request.session["session_key"] = s.session_key

        s = request.session["session_key"]
        fs = FileSystemStorage(location=os.path.join(SESSION_FILE_PATH, s))
        for old_file in fs.listdir('')[1]:
            fs.delete(old_file)

        # uploading a pymote pickle
        filename = fs.save(f.name, f)
        try:
            net = read_pickle(fs.path(filename))
        except UnpicklingError:
            fs.delete(filename)
            return JsonResponse({})

        tree_key = request.data["treeKey"]
        res = get_dict_from_net(net, tree_key)
        res = json.dumps(res, default=convert)
        with fs.open("%s.json" % filename.split('.')[0], "w") as f:
            f.write(res)
        res = json.loads(res)
        return JsonResponse(res)

    if request.method == "GET":
        return redirect("index")


@api_view(["POST"])
def simulation_action(request):
    if request.method == "POST":
        if request.session.session_key is None:
            s = SessionStore()
            s.create()
            request.session["session_key"] = s.session_key
            return HttpResponseNotFound()

        s = request.session["session_key"]
        fs = FileSystemStorage(location=os.path.join(SESSION_FILE_PATH, s))
        if not fs.exists(''):
            # os.makedirs(fs.location)
            return HttpResponseNotFound()

        net = None
        for filename in fs.listdir('')[1]:
            if filename.endswith(".npc.gz"):
                net = read_pickle(fs.path(filename))
                break

        if net is None:
            return HttpResponseNotFound()

        sim = Simulation(net)
        action_type = request.data["action"]
        if action_type == "run":
            sim.run_all()
        elif action_type == "step":
            step_size = request.data["stepSize"]
            sim.run(step_size)
        elif action_type == "reset":
            sim.reset()
        else:
            return

        tree_key = request.data["treeKey"]
        res = get_dict_from_net(net, tree_key)
        res = json.dumps(res, default=convert)
        with fs.open("%s.json" % filename.split('.')[0], "w") as f:
            f.write(res)
        write_pickle(net, fs.path(filename))
        res = json.loads(res)
        return JsonResponse(res)

    if request.method == "GET":
        return redirect("index")


def index(request):
    return render(request, "main_app/index.html")
