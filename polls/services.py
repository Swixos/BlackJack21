from django.http import HttpResponse
from polls.models import Game
from polls.models import Player

def create_game(game_name, players: list[str]):
    game = Game.objects.create(name=game_name)
    Player.objects.bulk_create([Player(name=player, game=game) for player in players])
    return HttpResponse('Game created')
    
def get_players(game_id):
    game = Game.objects.get(id=game_id)
    players = game.players.all()
    return players

def get_winners(game_id):
    game = Game.objects.get(id=game_id)
    players = game.players.all()
    max_score = max([player.score for player in players])
    winners = [player.name for player in players if player.score == max_score]
    return winners
        
def change_score(player_id, score):
    player = Player.objects.get(pk=player_id)
    player.score = score
    player.save()
    return player