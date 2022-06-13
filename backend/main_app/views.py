import json
import os
import numpy as np
from django.contrib.sessions.backends.db import SessionStore
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from networkx.readwrite import json_graph
from cPickle import UnpicklingError
from pymote.algorithm import NodeAlgorithm
from pymote.node import Node
from pymote import read_pickle
from rest_framework.decorators import api_view
from pymote_backend.settings import SESSION_FILE_PATH


def convert(o):
    if isinstance(o, Node):
        return o.id
    if isinstance(o, np.ndarray):
        return o.tolist()
    raise TypeError


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
            # TODO read_pickle should close the file before raising an
            #  exception!
            net = read_pickle(fs.path(filename))
        except UnpicklingError:
            fs.delete(filename)
            return JsonResponse({})

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

        res = json.dumps(res, default=convert)
        with fs.open("%s.json" % filename.split('.')[0], "w") as f:
            f.write(res)
        res = json.loads(res)
        return JsonResponse(res)

    if request.method == "GET":
        return redirect("index")


class IndexView(View):
    def get(self, request):
        return render(request, "main_app/index.html")
