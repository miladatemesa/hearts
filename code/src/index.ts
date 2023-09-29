import { HeartsGamePlayer } from '~/hearts-game/models/player/hearts-game-player';
import { HeartsGamePlayers } from '~/hearts-game/models/player/hearts-game-players';
import { HeartsGameTable } from '~/hearts-game/models/table/hearts-game-table';
import { Dealer } from '~/card-game/models/dealer/dealer';
import { Deck } from '~/card-game/models/deck/deck';
import { HeartsGameCards } from '~/hearts-game/models/card/hearts-game-cards';

const amir = HeartsGamePlayer.Named('amir');
const seyyed = HeartsGamePlayer.Named('seyyed');
const milad = HeartsGamePlayer.Named('milad');
const ali = HeartsGamePlayer.Named('ali');

const players = new HeartsGamePlayers(4);
players.addPlayer(amir).addPlayer(seyyed).addPlayer(milad).addPlayer(ali);

const deck = Deck.For(HeartsGameCards);

Dealer.instance.deal(players, deck);

// جای کارت ها عوض شود

const table = HeartsGameTable.For(players);

console.log(table);
