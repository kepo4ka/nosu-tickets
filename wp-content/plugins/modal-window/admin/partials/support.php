<?php if ( ! defined( 'ABSPATH' ) ) exit;
	$error = array();
	if ( !empty( $_POST['action'] ) && !empty( $_POST['wow_support_field'] ) ) {
		if (wp_verify_nonce($_POST['wow_support_field'],'wow_support_action') && current_user_can( 'manage_options' )) {	
			
			$fname = !empty($_POST['wow-fname']) ? sanitize_text_field($_POST['wow-fname']) : '';
			$lname = !empty($_POST['wow-lname']) ? sanitize_text_field($_POST['wow-lname']) : '';
			$message = !empty($_POST['wow-message']) ? sanitize_text_field($_POST['wow-message']) : '';
			$email = !empty($_POST['wow-email']) ? sanitize_email($_POST['wow-email']) : '';			
			$newsletter = !empty($_POST['wow-newsletter']) ? sanitize_text_field($_POST['wow-newsletter']) : '';
			$type = !empty($_POST['wow-message-type']) ? sanitize_text_field($_POST['wow-message-type']) : '';
			
			if (empty($fname)) {
				$error[] = 'Please, Enter your First Name.';
			}
			if (empty($lname)) {
				$error[] = 'Please, Enter your Last Name.';
			}
			if (empty($message)) {
				$error[] = 'Please, Enter your Message.';
			}
			if (empty($email)) {
				$error[] = 'Please, Enter your Email.';
			}
			if($newsletter != 'Yes'){
				$newsletter = 'No';
			}
			if ( count($error) == 0 ) {
				
				
				$plugin = $name.' v.'.$version;
				$website = get_option('home');				
				
				
				$headers = array(
				'From: '.$fname.' '.$lname.' <'.$email.'>',
				'content-type: text/html',					
				);
				$message = '<html>
				<head></head>
				<body>
				<table>				
				<tr>
				<td width="30%"><b>Plugin:</b></td>
				<td>'.$plugin.'</td>
				</tr>
				<tr>
				<td><b>Website:</b></td>
				<td>'.$website.'</td>
				</tr>
				<tr>
				<td><b>Signup for the newsletter:</b></td>
				<td>'.$newsletter.'</td>
				</tr>
				</table><p/>
				'.$message.'					
				</body>
				</html>';
				wp_mail('support@wow-company.com', 'Support Ticket (free): '.$type, $message, $headers);
				echo '<div class="wow-alert wow-alert-update "><p class="wow_error">Your Message sent to the Support</p></div>';
				
			}
			
			
		}	
		else {
			echo '<div class="wow-alert wow-alert-error "><p class="wow_error">Sorry, but message did not send. Please, contact us support@wow-company.com </p></div>';
		}
	}	
?>


<?php if ( count($error) > 0 ) echo '<div class="wow-alert wow-alert-error "><p class="wow_error">' . implode("<br />", $error) . '</p></div>'; ?>
<div class="wowbox" style="width:80%;">
	<form method="post" action="">
		<div class="wow-admin-col">									
			<div class="wow-admin-col-6">
				First Name:<br/>									
				<input type="text" name="wow-fname" value="" placeholder="Enter Your First Name">								
			</div>
			<div class="wow-admin-col-6">
				Last Name:<br/>									
				<input type="text" name="wow-lname" value="" placeholder="Enter Your Last Name">								
			</div>
		</div>
		<div class="wow-admin-col">
			<div class="wow-admin-col-6">
				WebSite:<br/>									
				<input type="text" disabled name="wow-website" value="<?php echo get_option('home'); ?>">								
			</div>
			<div class="wow-admin-col-6">
				Contact email:<br/>									
				<input type="text" name="wow-email" value="<?php echo get_option('admin_email'); ?>">								
			</div>
			
		</div>
		
		<div class="wow-admin-col">			
			<div class="wow-admin-col-6">
				Plugin:<br/>						
				<input type="text" disabled name="wow-plugin" value="<?php if(!empty($name)) { echo $name.' v.'.$version; };?>">						
			</div>		
			<div class="wow-admin-col-6">
				Message type:<br/>
				<select name="wow-message-type">
					
					<option value="Issue">Issue</option>
					<option value="Idea">Idea</option>										
				</select>						
			</div>
		</div>	
		<div class="wow-admin-col">
			<div class="wow-admin-col-12">
				<textarea name="wow-message" placeholder="Enter Your Message"></textarea>						
			</div>
		</div>
		<div class="wow-admin-col">
			<div class="wow-admin-col-6">
				<input type="checkbox" name="wow-newsletter" value="Yes" id="wow-newsletter" checked="checked"> <label for="wow-newsletter"><b>Signup for the newsletter from Wow-Company</b></label>
			</div>
			<div class="wow-admin-col-6 right">
				<input type="submit" class="wow-btn" name="action" value="Send a Message to Support">						
			</div>
		</div>
		<?php wp_nonce_field('wow_support_action','wow_support_field'); ?>
	</form>
</div>
