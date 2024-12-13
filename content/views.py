from markdown import markdown
from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Blog

class BlogGenerateView(APIView):
    permission_classes = [AllowAny]  
    authentication_classes = []

    def post(self, request):
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt', '')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        if not prompt:
            return JsonResponse({'error': 'Prompt is required'}, status=400)

        client = OpenAI(
           
            # api_key="",
            base_url='http://localhost:1234/v1/',
            )

        print("asdfasdfsad")

        try:
            print("asdfasㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇdfsad")
            completion = client.chat.completions.create(
                # model="gpt-4o-mini",
                model="Qwen/Qwen2.5-7B-Instruct-GGUF",
                messages=[
                    {"role": "system", "content": "You are a blog writer."},
                    {"role": "user", "content": f"""Write a blog about {prompt}.
                     제목은 항상 #로 시작해서 크게 보이게 만들어야함.
                     """},
                ],
                max_tokens=1024
            )
        
            content = completion.choices[0].message.content
        except Exception as e:
            return JsonResponse({'error': 'Failed to generate content from OpenAI'}, status=500)
    
        html_content = markdown(content, extensions=['fenced_code'])
        print("asdfasdfsa12312412412412d")

        return JsonResponse({
            "title": prompt,
            "content": html_content  # Markdown에서 변환된 HTML
        }, status=201)
