import json
import os
import numpy as np
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from networkx.readwrite import json_graph
from pymote.algorithm import NodeAlgorithm
from pymote.node import Node
from pymote import read_pickle
from rest_framework.decorators import api_view
from pymote_backend.settings import MEDIA_ROOT


def convert(o):
    if isinstance(o, Node):
        return o.id
    if isinstance(o, np.ndarray):
        return o.tolist()
    raise TypeError


@api_view(["POST"])
def upload_network(request):
    if request.method == "POST":
        # uploading a pymote pickle
        f = request.FILES.get("file")
        if f is None:
            return JsonResponse({})
        fs = FileSystemStorage(location=os.path.join(MEDIA_ROOT, "tmp_networks"))
        filename = fs.save(f.name, f)
        net = read_pickle(fs.path(filename))
        fs.delete(filename)

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
        res = json.loads(res)
        return JsonResponse(res)
    if request.method == "GET":
        return redirect("index")


class IndexView(View):
    def get(self, request):
        return render(request, "main_app/index.html")
