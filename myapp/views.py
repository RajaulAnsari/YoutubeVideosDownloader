from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from pytube import YouTube
import os
# Create your views here.

def download_video(request):
    if request.method == 'POST':
        link = request.POST.get('video_link')
        try:
            youtube_object = YouTube(link)
            video_stream = youtube_object.streams.get_highest_resolution()
            user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
            is_mobile = any(keyword in user_agent for keyword in ['android', 'iphone', 'ipad', 'mobile'])
            home_directory = os.path.expanduser("~")
            if is_mobile:
                output_path = os.path.join(home_directory, 'Youtube Videos')
            elif os.name == 'posix':  # Linux or macOS
                output_path = os.path.join(home_directory, 'Downloads')
            elif os.name == 'nt':  # Windows
                output_path = os.path.join(home_directory, 'Downloads')
            else:
                # Handle other operating systems as needed
                raise NotImplementedError("Unsupported operating system")
            os.makedirs(output_path, exist_ok=True)
            video_stream.download(output_path)
            response_data = {'success': True, 'message': 'Download completed successfully'}
            return JsonResponse(response_data)
        except Exception as e:
            response_data = {'success': False, 'message': 'Invalid or unavailable YouTube link. Please check the link and try again.'}
            return JsonResponse(response_data, status=500)

    return render(request, 'index.html')


