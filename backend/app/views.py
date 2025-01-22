from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

class ReactView(APIView):
    def get(self, request):
        output = [{"nome": output.nome, "cargo": output.cargo}
                  for output in React.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def patch(self, request):
        nome = request.data.get('nome')

        if not nome:
            return Response({"error": "O campo 'nome' é obrigatório."}, status=400)

        react_instance = self.get_user_by_name(nome)

        if react_instance:
            return self.update_user(react_instance, request.data)
        else:
            return self.create_user(request.data)

    def delete(self, request):
        nome = request.data.get('nome')

        if not nome:
            return Response({"error": "O campo 'nome' é obrigatório para deletar."}, status=400)

        react_instance = self.get_user_by_name(nome)

        if react_instance:
            react_instance.delete()
            return Response({"message": f"Usuário '{nome}' deletado com sucesso!"}, status=200)
        else:
            return Response({"error": f"Usuário com nome '{nome}' não encontrado."}, status=404)

    def get_user_by_name(self, nome):
        try:
            return React.objects.get(nome=nome)
        except React.DoesNotExist:
            return None

    def create_user(self, data):
        serializer = ReactSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Usuário criado com sucesso!", "data": serializer.data},
                status=201
            )
        return Response(serializer.errors, status=400)

    def update_user(self, user_instance, data):
        serializer = ReactSerializer(user_instance, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Usuário atualizado com sucesso!", "data": serializer.data},
                status=200
            )
        return Response(serializer.errors, status=400)
