/**
 * @author Mersenski, Mark
 */
$(document).ready(function(){
	//decalaring outside function so it can be used in the numCheck function
	var numMatch = [];
	
	//initial #wrapper height
	var wrapHeight = 320;
	$('#wrapper').height(wrapHeight);
	
	//hide the game table
	$('.form1').hide();
	$('.form2').hide();
	$('#theForm').hide();
	
	//clear out 'play again' message
	$('#test1').empty();
	
	$(validation);
	
	function validation(){
		var myRules = 
			// Object containing the validation rules
				{
					numInput1:					// The "name" attribute of the form control
						{
			  				required: true,	    // Make this field required
							digits: true,		// Only digits are allowed
							min: 0,				// Set the minimum amount
							max: 9				// Set the minimum amount
						},
			
					numInput2:
						{
			  				required: true,	    // Make this field required
							digits: true,		// Only digits are allowed
							min: 0,				// Set the minimum amount
							max: 9				// Set the minimum amount
						},
			
					numInput3:
						{
			  				required: true,	    // Make this field required
							digits: true,		// Only digits are allowed
							min: 0,				// Set the minimum amount
							max: 9				// Set the minimum amount
						},	
						
					numInput4:
						{
			  				required: true,	    // Make this field required
							digits: true,		// Only digits are allowed
							min: 0,				// Set the minimum amount
							max: 9				// Set the minimum amount
						}	
				};
				
				var myMessages = 
				// Object containing the error messages
				
				{
					numInput1:		// The "name" attribute of the form control
						{
							required: 'Don\'t leave blank',
							digits: 'Enter a number',
							min: 'Min value is 0',
							max: 'Max value is 9'
						},
			
					numInput2:
						{
							required: 'Don\'t leave blank',
							digits: 'Enter a number',
							min: 'Min value is 0',
							max: 'Max value is 9'			
						},
			
					numInput3:
						{
							required: 'Don\'t leave blank',
							digits: 'Enter a number',
							min: 'Min value is 0',
							max: 'Max value is 9'		
						},	
						
					numInput4:
						{
							required: 'Don\'t leave blank',
							digits: 'Enter a number',
							min: 'Min value is 0',
							max: 'Max value is 9'		
						}							
				};
				
				// Object containing the entire validation configuration
				var config = 
				{
					submitHandler: numCheck,
					rules: myRules,
					messages: myMessages
				};
				// Pass the config object to the form's validate() method
				$('#theForm').validate(config);
		
	}
	
	//this script hides the table containing previous answers and the start over button
	$('#myTable').hide();
	$('#startOver').hide();	
	$('#numCheck').hide();
		
	function numMatchGenerator(){	
		//hide start button so user cannot accidentally restart the game half way through
		//if user wants to restart the game, they have to click the 'Start Over' button
		$('#startGame').hide();
		
		//change #wrapper height
		wrapHeight = 320;
		wrapHeight += 100;
		$('#wrapper').height(wrapHeight);
		
		//make the game table visible
		$('.form1').show();
		$('.form2').show();
		$('#theForm').show();
		
		//clear out 'play again' message
		$('#test1').empty();
		
		//populate numMatch boxes with question marks
		$('#one').val('?');
		$('#two').val('?');
		$('#three').val('?');
		$('#four').val('?');
		
		//clear out bull and cow count div boxes
		$('#bullCount').empty();
		$('#cowCount').empty();
		
		//reset user input fields with a value of zero
		for(i=1; i < 5; i++){
			$('#numInput' + i).val('0');
		}
		
		count = 0;
		
		//declare array for number the user has to match against
		numMatch = [];
		//a number bank that will populate numMath
		var numBank = [0,1,2,3,4,5,6,7,8,9];									

		//this loop will randomly select an array position push that value into the numMatch array
		for(i = 0; i < 4; i++){
			//generates a random number and changes the random number range by i
			var randomNum = Math.floor(Math.random() * numBank.length);
			
			//adds number from numBank to numMatch array
			numMatch.push(numBank[randomNum]);
			
			//removes the number from numBank so no duplicates are pulled
			numBank.splice(randomNum, 1);
		}		
		
		//show in-game user options
		$('#myTable').show();
		$('#startOver').show();		
		$('#numCheck').show();	
	}
	
	//start game button function
	$('#startGame').click(numMatchGenerator);
	
	//this count variable will display how many attempts the user has made
	var count = 0;
	
	//number checker function
	function numCheck(){
		var numInputArray = [];
		var bullCount = 0;
		var cowCount = 0;
		count++;
		
		//clear out any message in this div
		$('#test1').empty();
		
		//clear out the user input array at the start of each check
		for(i = 1; i < 5; i++){
			numInputArray.push($('#numInput' + i).val());
		}
		
		var duplicate = '<p style="color:red;">No duplicate values are allowed in the number set</p>';
		//check to see if any of the numInput values are the same
		if(numInputArray[0] == numInputArray[1] || numInputArray[0] == numInputArray[2] || numInputArray[0] == numInputArray[3]){
			//$('#test1').html('Value is a duplicate');
			$('#test1').html(duplicate);
			count--;
		}
		else if(numInputArray[1] == numInputArray[0] || numInputArray[1] == numInputArray[2] || numInputArray[1] == numInputArray[3]){
			$('#test1').html(duplicate);
			count--;
		}
		else if(numInputArray[2] == numInputArray[0] || numInputArray[2] == numInputArray[1] || numInputArray[2] == numInputArray[3]){
			//$('#test1').html('Value is a duplicate');
			$('#test1').html(duplicate);
			count--;
		}	
		else if(numInputArray[3] == numInputArray[0] || numInputArray[3] == numInputArray[1] || numInputArray[3] == numInputArray[2]){
			//$('#test1').html('Value is a duplicate');
			$('#test1').html(duplicate);
			count--;
		}	
		//if no input values are the same, we can start our bull and cow count and see if we have a winner		
		else{		
			//bull and cow counter loops
			for (i=0;i<=3;i++){
				for (x=0; x<=3;x++){
					if(numInputArray[i] == numMatch[x]){
						cowCount++;
					}
				}
			}
			
			for(j=0, y=0; j<=3;j++){
				if(numInputArray[j] == numMatch[y]){
					bullCount++;
					cowCount--;
				}
				y++;
			}
			
			//answer check to see if game is over
			if(bullCount == 4){
				alert("you win");
				
				//display winning bull and cow count numbers
				$('#bullCount').html(4);
				$('#cowCount').html(0);
				
				//hide in-game user options
				$('#startOver').hide();	
				$('#numCheck').hide();
				
				//display the random number generated to match against
				$('#one').val(numMatch[0]);
				$('#two').val(numMatch[1]);
				$('#three').val(numMatch[2]);
				$('#four').val(numMatch[3]);
			
				//adjust height for winning display
				wrapHeight = 450;
				$('#wrapper').height(wrapHeight);
				
				//show start button for new game
				$('#startGame').show();
				//message for user on how to start a new game
				$('#test1').html('Play again by clicking the Start Game buton above');
				//reset in-game table code
				$('#myTable').replaceWith( '<table id="myTable"><tr><th>Guess Count</th><th>Your Guess</th><th>Bulls</th><th>Cows</th></tr></table>');		
				
				//hide the in-game table
				$('#myTable').hide();		
			}
			else{
				//display how many bull and cows the user has
				$('#bullCount').html(bullCount);
				$('#cowCount').html(cowCount);
				
				//append the count, user input, bull and cow counts to the in-game table
				$('#myTable tr:last').after('<tr><td>#'+count+'</td><td>'+numInputArray[0]+'-'+numInputArray[1]+'-'+numInputArray[2]+'-'+numInputArray[3]+'</td><td>'+bullCount+'</td><td>'+cowCount+'</td></tr>');
				
				//change #wrapper height
				wrapHeight += 24;
				$('#wrapper').height(wrapHeight);
			}
		}//closing of else statement from the duplicate number if/else check statements
		
		return false;
	}
	
	$('#startOver').click(function(){
		var startOver = confirm('By clicking start over, a new game session will begin');
		
		if (startOver == true){
		
			//alert('By clicking start over, a new game session will begin');
			//confirm('By clicking start over, a new game session will begin');		
			alert('The answer was: '+numMatch[0]+'-'+numMatch[1]+'-'+numMatch[2]+'-'+numMatch[3]);
			//reset count to zero
			count = 0;
			
			//reset wrapper height
			//100px will automatically be added once the numMatchGenerator function runs
			wrapHeight = 320;
			$('#wrapper').height(wrapHeight);
			
			//generate a new set of numbers to match against
			numMatchGenerator();
			
			//resest in-game table
			$('#myTable').replaceWith( '<table id="myTable"><tr><th>Guess Count</th><th>Your Guess</th><th>Bulls</th><th>Cows</th></tr></table>');
			$('#bullCount').empty();
			$('#cowCount').empty();
			
			//resest numMatch values to display a question mark
			$('#one').val('?');
			$('#two').val('?');
			$('#three').val('?');
			$('#four').val('?');
			
			//reset the user input fields to zero
			for(i=1; i < 5; i++){
				$('#numInput' + i).val('0');
			}
		
		}
		
		else{
			
		}
		
	});
	
});