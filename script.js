// Global Variables
var first_card_clicked=null;
var second_card_clicked=null;
var total_possible_matches=9;
var match_counter=0;
var flipped=false;
var matches=0;
var attempts=0;
var accuracy=0;
var games_played=0;
var rows=3;
// on docready
$(document).ready(function () {
    new_board();
    console.log(total_possible_matches);
    display_stats();
    // When a card is clicked...
        $('.card').click(function(){
            card_clicked(this)
        });
    // Reset Button
    $('.reset').click(function () {
        games_played++;
        display_stats();
        reset_stats()
        console.log('games played: '+ games_played)
    });
//
});

function card_clicked(card) {
    // hide the back (the front is already "showing" but is blocked by back)
    if(flipped==true){
        return;
    }
    $(card).find('.back').hide();
    //if the first card has a value equal to null, assign it the value of the card clicked, and console log what "this" is to make sure I'm targeting correctly. Then return.
    if (first_card_clicked == null) {
        first_card_clicked = $(card);
        console.log(card);
        return;
    }
    //    if first card isn't null, ie was already assigned a value, then second card is assigned the value of card clicked instead. console log the two values.
    else {
        second_card_clicked = $(card);
        flipped=true;
        attempts++;
        console.log('attempts: ' + attempts);
        console.log('first card is ', first_card_clicked, 'second card is ', second_card_clicked);
        //if the two cards have equal .front img src attributes, then up the match_counter by 1, console log the new total, reset first/second cards to null, and if total matches possible and match_count are equal in value, send out an alert to say the game is over. Otherwise just return.
        if (first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')) {
            match_counter++;
            matches++;
            console.log('match counter: ' + match_counter);
            console.log('matches: ' + matches);
            first_card_clicked = null;
            second_card_clicked = null;
            flipped=false;
            display_stats();
            if (match_counter == total_possible_matches) {
                alert('GAME!');
            }
            else {
                return;
            }
        }
        //    if the cards dont match show the backs again and reset the values of first/second cards clicked to null, after 2 seconds
        else {
            display_stats();
            setTimeout(function () {
                $(first_card_clicked).find('.back').show();
                $(second_card_clicked).find('.back').show();
                first_card_clicked = null;
                second_card_clicked = null;
                flipped=false;
            }, 2000);
            return;
        }
    }
}
//For displaying stats
function display_stats(){
    calc_acc();
    $('.games_played .value').html(games_played);
    $('.attempts .value').html(attempts);
    $('.accuracy .value').html(accuracy + '%');
    console.log('accuracy: ' +accuracy)
}

function calc_acc(){
    if(attempts != 0){
        accuracy = (matches/attempts) * 100;
        return null;
    }
}
function reset_stats(){
    accuracy=0;
    matches=0;
    attempts=0;
    display_stats();
}


function new_board() {
    var row_1=$('<div>').addClass('row').attr('id', 'row_1');
    var row_2=$('<div>').addClass('row').attr('id', 'row_2');
    var row_3=$('<div>').addClass('row').attr('id', 'row_3');
    var game_board=$('#game-area');
    var source_array = ["images/Falco.png", "images/Falco.png", "images/Fox.png", "images/Fox.png", "images/Iceclimber.png", "images/Iceclimber.png", "images/Kirby.png", "images/Kirby.png", "images/Link.png", "images/Link.png", "images/Luigi.png", "images/Luigi.png", "images/Mario.png", "images/Mario.png", "images/Sheik.png", "images/Sheik.png", "images/Zelda.png", "images/Zelda.png"];
    var src_array_length= source_array.length;
    for (i = 0; i < src_array_length; i++) {
        var card_outline = $('<div>').addClass("card col-xs-2");
        var card_front = $('<div>').addClass("front");
        var front_img_source_decider = Math.floor(Math.random() * (source_array.length-1));
        console.log('source decider number= ' , front_img_source_decider);
        var front_img_source = source_array[front_img_source_decider];
        var card_front_img = $('<img>').attr({'class': 'front_img', 'src': front_img_source});
        var card_back = $('<div>').addClass('back');
        var card_back_img = $('<img>').attr({'class': 'back_img', 'src': 'images/SSBM.jpg'});
        source_array.splice(front_img_source_decider, 1);
        card_front.append(card_front_img);
        card_back.append(card_back_img);
        card_outline.append(card_front, card_back);
        if(i<6){
            row_1.append(card_outline);
        }
        else if(i<12){
            row_2.append(card_outline);
        }
        else{
            row_3.append(card_outline);
        }
        console.log('card number '+i);
    }
    game_board.append(row_1,row_2,row_3);
}