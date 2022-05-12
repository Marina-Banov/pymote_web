import base64
import os
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from pymote import read_pickle
from rest_framework.decorators import api_view
from pymote_backend.settings import MEDIA_ROOT
import matplotlib.pyplot as plt


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
        filename = fs.save(".".join(f.name.split(".")[:-1])+'.png', f)
        plt.savefig(fs.path(filename))
        with fs.open(filename) as image_file:
            image_base64 = base64.b64encode(image_file.read())
        fs.delete(filename)

        res = {'image': 'data:image/png;base64,' + image_base64}
        return JsonResponse(res)


class IndexView(View):
    def get(self, request):
        return render(request, 'main_app/index.html')
