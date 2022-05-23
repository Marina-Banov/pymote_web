import json
import os
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from networkx.readwrite import json_graph
from pymote.node import Node
from pymote import read_pickle
from rest_framework.decorators import api_view
from pymote_backend.settings import MEDIA_ROOT


def convert(o):
    if isinstance(o, Node):
        return o.id
    raise TypeError


@api_view(['POST'])
def upload_network(request):
    if request.method == "POST":
        # uploading a pymote pickle
        f = request.FILES.get('file')
        if f is None:
            return redirect('index')
        fs = FileSystemStorage(location=os.path.join(MEDIA_ROOT, 'tmp_networks'))
        filename = fs.save(f.name, f)
        net = read_pickle(fs.path(filename))
        fs.delete(filename)

        net.get_fig()
        data = json_graph.node_link_data(net)
        data = json.dumps(data, default=convert)
        data = json.loads(data)
        for i, pos in enumerate(net.pos.keys()):
            data["nodes"][i]["x"] = net.pos[pos][0]
            data["nodes"][i]["y"] = net.pos[pos][1]
        return JsonResponse(data)


class IndexView(View):
    def get(self, request):
        return render(request, 'main_app/index.html')
