
<?php
	
	
	
	/*
		File Name: send-reminder-email.php
		Author: Hoon Wei Xiong, Terence Lee
		Date Created: 15 November 2021
		Purpose: To send inspection reminder emails to clients
	*/
	
	error_reporting(E_ALL);
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	require_once "../php/vendor/autoload.php";

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	/*
		Retrieves the request sent by client as a JSON,
		then parses it into an object
		
		The various data in the request are then retrieved from 
		the object
	*/
	$clientRequestData = file_get_contents('php://input');
	$clientJsonObj = json_decode($clientRequestData, true);
	
	$emailAddress = $clientJsonObj["emailAddress"];
	$overdueInspections  =$clientJsonObj["overdueInspections"];
	$upcomingDueInspections =  $clientJsonObj["upcomingDueInspections"];


	$emailBodyString = generateEmailBodyString($overdueInspections, $upcomingDueInspections);

	//sending the email reminder to the client
	sendReminderEmail($emailAddress,  $emailBodyString );
	
	
	function generateEmailBodyString( $overdueInspections, $upcomingDueInspections)
	{
		$borderCssString = "'border: 1px solid black; border-collapse: collapse; padding:10px; 
							text-align:center'";
		
		$emailBodyString = "Hi user,<br/><br/>";
		
		$emailBodyString .= "You have upcoming and/or overdue hive inspections as follows:<br /><br />";
		
		if (count($overdueInspections) > 0)
		{
			$emailBodyString .= "<h3>Overdue Hive Inspections</h3>";

			$emailBodyString .= "<table style={$borderCssString}>
				<tr style={$borderCssString}>
					<th style={$borderCssString}>ID</th>
					<th style={$borderCssString}>HIVE ID</th>
					<th style={$borderCssString}>Due Date</th>
				</tr>";
			
			for ($i=0; $i <count($overdueInspections); $i++)
			{	
				$rowId = $i + 1;

				$hiveId = strtoupper($overdueInspections[$i]['hiveId']);
				
				$emailBodyString .= "<tr style={$borderCssString}>";
				
				$emailBodyString .= "<td style={$borderCssString}> {$rowId} </td>";
				
				$emailBodyString .= "<td style={$borderCssString}> {$hiveId }</td>";
				
				$emailBodyString .= "<td style={$borderCssString}> {$overdueInspections[$i]['nextInspectionDate']}</td>";
				
				$emailBodyString .= "</tr>";
			}
			
			$emailBodyString .= "</table><br />";
		}
		
		
		
		
		if (count($upcomingDueInspections) > 0)
		{
			$emailBodyString .= "<h3>Upcoming Hive Inspections</h3>";
			

			$emailBodyString .= "<table style={$borderCssString}>
				<tr style={$borderCssString}>
					<th style={$borderCssString}>ID</th>
					<th style={$borderCssString}>HIVE ID</th>
					<th style={$borderCssString}>Last Inspection Date</th>
					<th style={$borderCssString}>Due Date</th>
				</tr>";
			
			for ($i=0; $i <count($upcomingDueInspections); $i++)
			{
				$rowId = $i + 1;

				$hiveId = strtoupper($upcomingDueInspections[$i]['hiveId']);
				
				$emailBodyString .= "<tr style={$borderCssString}>";
				$emailBodyString .= "<td style={$borderCssString}> {$rowId}</td>";
				
				$emailBodyString .= "<td style={$borderCssString}> {$hiveId }</td>";
				$emailBodyString .= "<td style={$borderCssString}> {$upcomingDueInspections[$i]['lastInspectionDate']}</td>";
				$emailBodyString .= "<td style={$borderCssString}> {$upcomingDueInspections[$i]['nextInspectionDate']}</td>";
				
				$emailBodyString .= "</tr>";
			}
			
			$emailBodyString .= "</table/><br />";
		}
			
		$emailBodyString.= "<br />Please complete the above-mentioned hive inspections as soon as possible 
											and update it on the Apiary Management System.<br/><br/>
			
						Thank you.<br/><br/>
		
						Regards,<br/>
						Apiary Management System<br/>
						<small>[This is a notification-only email address that does not accept incoming emails. Please do not reply to this message]</small>";
		
		
		
		return $emailBodyString;
	}
	
	

	/*
		Brief: Sends a reminder email to a particular email address. The email
					sent is in HTML, sent using the email 'ict302team6@gmail.com'
		
		Dependencies: The function is dependent on the PHPMailer library
		
		Arguments:
			[1] $recipientEmailAddress- the email address of the recipient
			[3] $hiveId - the id of the hive that is due for inspection
			[4] $dueDate - the due date of the inspection
			
		Return:
			This method does not return. However, it echos whether the operation is
			successful
			
			If successful, it returns a json string with 'outcome' property = 'success'
			
			If not successful, it returns a json string with 'outcome' property = 'failure'
	*/
	function sendReminderEmail($recipientEmailAddress,  $emailBodyString )
	{
		$mail = new PHPMailer(true);

		try
		{
			//SMTP debugging, only enable it during development/debuggin
			//$mail->SMTPDebug = 3;          
			
			//Set PHPMailer to use SMTP.
			$mail->isSMTP();      
			
			//Set SMTP host name                          
			$mail->Host = "smtp.gmail.com";
			
			//Set this to true as Gmail host requires authentication to send email
			$mail->SMTPAuth = true;          
			
			//Provide username and password     
			$mail->Username = "ict302team6@gmail.com";                 
			$mail->Password = "team6**&&^^%1";         
			
			//TLS encryption required for Gmail then set it
			$mail->SMTPSecure = "tls";               
			
			//Default port number for gmail SMTP
			$mail->Port = 587;                                   

			$mail->From = "ict302team6@gmail.com";
			$mail->FromName = "Apiary Management System";

			//set email recipient
			$mail->addAddress($recipientEmailAddress);

			$mail->isHTML(true);

			$mail->Subject = "[DO NOT REPLY] INSPECTION REMINDER";
			
			$mail->Body = $emailBodyString;


			$serverReply = array();

		
			$mail->send();
			$serverReply["sendEmailOutcome"] = "success";
		} 
		catch (Exception $e) 
		{
			$serverReply["sendEmailOutcome"] = "failure";
			$serverReply["errorMessage"] = $mail->ErrorInfo;
		}
		
		
		
		echo json_encode($serverReply);
		
	}//end of function sendReminderEmail

	


?>