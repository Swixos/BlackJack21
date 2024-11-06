from ninja import NinjaAPI, ModelSchema, Schema
from polls.models import Game, Player
from django.http import Http404
from django.core.exceptions import ValidationError
from django.db import transaction

api = NinjaAPI()

# class ChoiceSchema(ModelSchema):
#     class Meta:
#         model = Choice
#         fields = ["id", "choice_text", "votes"]
        
# class QuestionSchema(ModelSchema):
#     class Meta:
#         model = Question
#         fields = ["id", "question_text", "pub_date"]
#     choices: list[ChoiceSchema]
    
# class AddQuestionSchema(Schema):
#     question_text: str
#     choices: list[str]
    
class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ["id", "name", "score"]
        
class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ["id", "name", "turn", "ended"]
    players: list[PlayerSchema]
        
class AddGameSchema(Schema):
    name: str
    players: list[str]
    
# @api.post("/create_question/", response=QuestionSchema)
# def add(request, add_question: AddQuestionSchema):
#     question = Question.objects.create(
#         question_text=add_question.question_text,
#         pub_date=timezone.now()
#     )

#     for choice in add_question.choices:
#         Choice.objects.create(
#             choice_text=choice,
#             question=question
#         )
#     return question

# @api.get("/question/{question_id}", response=QuestionSchema)
# def get(request, question_id: int):
#     return Question.objects.get(pk=question_id)

@api.post("/create_game", response=GameSchema)
@transaction.atomic
def add(request, add_game: AddGameSchema):
    if len(add_game.name) < 3:
        return api.create_response(request, {"detail": "Le nom de la partie doit contenir au moins 3 caractères"}, status=400)
    game = Game(name=add_game.name)
    game.full_clean()
    game.save()
    if len(add_game.players) < 1:
        return api.create_response(request, {"detail": "La partie doit contenir au moins un joueur"}, status=400)
    for player in add_game.players:
        print(player)
        if len(player) < 3:
            return api.create_response(request, {"detail": "Le nom du joueur doit contenir au moins 3 caractères"}, status=400)
        else:
            Player.objects.create(name=player, game=game)
    return game

@api.get("/game/{game_id}", response=GameSchema)
def get(request, game_id: int):
    try:
        game = Game.objects.get(pk=game_id)
    except Game.DoesNotExist:
        raise Http404("Game does not exist")
    return game

@api.get("/games", response=list[GameSchema])
def get_all(request):
    return Game.objects.all()

@api.delete("/game/{game_id}")
def delete(request, game_id: int):
    try:
        game = Game.objects.get(pk=game_id)
    except Game.DoesNotExist:
        raise Http404("Game does not exist")
    game.delete()
    return {"message": "Game deleted"}