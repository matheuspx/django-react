from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
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

        # Verifica se o nome foi enviado na requisição
        if not nome:
            return Response({"error": "O campo 'nome' é obrigatório."}, status=400)

        # Tenta buscar o usuário
        react_instance = self.get_user_by_name(nome)

        if react_instance:
            # Se o usuário existir, atualiza
            return self.update_user(react_instance, request.data)
        else:
            # Se o usuário não existir, cria
            return self.create_user(request.data)

    def get_user_by_name(self, nome):
        """
        Busca um usuário pelo nome.
        Retorna a instância do usuário se encontrado ou None se não existir.
        """
        try:
            return React.objects.get(nome=nome)
        except React.DoesNotExist:
            return None

    def create_user(self, data):
        """
        Cria um novo usuário com os dados fornecidos.
        Retorna a resposta apropriada.
        """
        serializer = ReactSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Usuário criado com sucesso!", "data": serializer.data},
                status=201
            )
        return Response(serializer.errors, status=400)

    def update_user(self, user_instance, data):
        """
        Atualiza um usuário existente com os dados fornecidos.
        Retorna a resposta apropriada.
        """
        serializer = ReactSerializer(user_instance, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Usuário atualizado com sucesso!", "data": serializer.data},
                status=200
            )
        return Response(serializer.errors, status=400)
