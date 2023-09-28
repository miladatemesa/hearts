import Player from "./Player";
import HeartsTable from "./HeartsTable";
import Dealer from "./Dealer";
import Shuffler from "./Shuffler";

const dealer = new Dealer(new Shuffler);

const milad = new Player('Milad');
const reza = new Player('Reza');
const ali = new Player('Ali');
const amir = new Player('Amir');

const table = new HeartsTable(dealer);
table.addPlayer(milad);
table.addPlayer(reza);
table.addPlayer(ali);
table.addPlayer(amir);

table.start();