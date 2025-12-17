from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta

# In-memory storage
tasks = []
task_id = 1


@api_view(['GET', 'POST'])
def task_list(request):
    global task_id

    # GET all tasks
    if request.method == 'GET':
        return Response(tasks)

    # CREATE a new task
    if request.method == 'POST':
        title = request.data.get('title')
        priority = request.data.get('priority', 'Medium')
        due_minutes = int(request.data.get('due_minutes', 10))

        if not title:
            return Response({"error": "Title required"}, status=400)

        task = {
            "id": task_id,
            "title": title,
            "priority": priority,
            
            "due_datetime": request.data.get("due_datetime"),
            "completed": False
        }

        tasks.append(task)
        task_id += 1
        return Response(task)


@api_view(['PUT', 'DELETE'])
def task_detail(request, id):
    # Find task by id
    task = next((t for t in tasks if t["id"] == id), None)

    if not task:
        return Response({"error": "Task not found"}, status=404)

    # Mark task as completed
    if request.method == 'PUT':
        task["completed"] = True
        return Response(task)

    # Delete task
    if request.method == 'DELETE':
        tasks.remove(task)   # ✅ FIX
        return Response({"message": "Task deleted"})
