<?php if ( ! defined( 'ABSPATH' ) ) exit; 
include ('include/data.php'); ?>
<form action="admin.php?page=<?php echo $this->pluginname; ?>" method="post">	
	<div class="wowcolom">		
		<div id="wow-leftcol">		
			<input  placeholder="Name is used only for admin purposes" type='text' name='title' value="<?php echo $title; ?>" class="input-100 wow-title"/>
			<div class="wow-admin">
				<?php wp_editor(stripcslashes($content), 'content', $settings); ?>
			</div>
			<div class="tab-box wow-admin">
				<ul class="tab-nav">
					<li><a href="#t1"><i class="fa fa-css3" aria-hidden="true"></i> Style</a></li>					
					<li><a href="#t3"><i class="fa fa-times-circle" aria-hidden="true"></i> Close Button</a></li>
					<li><a href="#t4"><i class="fa fa-eye" aria-hidden="true"></i> Display</a></li>					
					<li><a href="#t6"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Button</a></li> 
					<li><a href="#t7"><i class="fa fa-flag-o" aria-hidden="true"></i> Icons</a></li> 
 					<li><a href="#t8"><i class="fa fa-address-card-o"></i> Form</a></li>
				</ul>
				<div class="tab-panels">
					<div id="t1">
						<div class="itembox">
							<div class="item-title">
								<h3>Style</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Width:<br/>
									<input type='text' placeholder="662"  name='modal_width' value="<?php echo $modal_width; ?>" style="margin-bottom:5px;"/><br/> 
									<input name="modal_width_par" type="radio" value="px" <?php if($modal_width_par=='px') { echo 'checked="checked"'; } ?>>px <input name="modal_width_par" type="radio" value="pr" <?php if($modal_width_par=='pr') { echo 'checked="checked"'; } ?>>%
								</div>
								<div class="wow-admin-col-4">
									Height:<br/> 
									<input type='text' placeholder="auto" name='modal_height' value="<?php echo $modal_height; ?>" style="margin-bottom:5px;"/><br/> 
									<input name="modal_height_par" type="radio" value="auto" <?php if($modal_height_par=='auto') { echo 'checked="checked"'; } ?>>auto <input name="modal_height_par" type="radio" value="px" <?php if($modal_height_par=='px') { echo 'checked="checked"'; } ?>>px <input name="modal_height_par" type="radio" value="pr" <?php if($modal_height_par=='pr') { echo 'checked="checked"'; } ?>>%	
								</div>  
								<div class="wow-admin-col-4">
									Padding (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="10" disabled="disabled" />
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Border width (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="0" disabled="disabled" /> 
								</div>
								<div class="wow-admin-col-4">
									Border radius (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="5" disabled="disabled" /> 
								</div>
								<div class="wow-admin-col-4">
									Z-index <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="99999" disabled="disabled" />
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Background image <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="link" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Position <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<select disabled="disabled">										
										<option>Fixed</option> 		           		 
									</select>
								</div>
								<div class="wow-admin-col-4">
									Top position (%) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>: <input type="checkbox" checked="checked" disabled="disabled"><br/>
									<input type='text'  placeholder="10" disabled="disabled" /> 
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Bottom position (%) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>: <input type="checkbox" disabled="disabled"><br/>
									<input type='text'  placeholder="0" disabled="disabled" /> 
								</div>
								<div class="wow-admin-col-4">
									Left position (%) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>: <input type="checkbox" checked="checked" disabled="disabled"><br/>
									<input type='text'  placeholder="0" disabled="disabled" /> 
								</div>
								<div class="wow-admin-col-4">
									Right position (%) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>: <input type="checkbox" checked="checked" disabled="disabled"><br/>
									<input type='text'  placeholder="0" disabled="disabled" /> 
								</div>
							</div>
							<div class="wow-admin-col"> 
								<div class="wow-admin-col-4">
									Overlay <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<input type="checkbox" checked="checked" disabled="disabled"><br/>
									<div id="overlay">
										<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/background.jpg">
									</div>
								</div>
								<div class="wow-admin-col-4">	
									Background color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4">
									Border color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/border.jpg">
								</div>
							</div>
						</div>
						<div class="itembox">
							<div class="item-title">
								<h3>Mobile Style</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-6">
									Trigger for screens less than (px):<br/>
									<input type='text' placeholder="1024" name='screen_size' value="<?php echo $screen_size; ?>"/>
								</div>
								<div class="wow-admin-col-6">
									Width: <br/>
									<input type='text' placeholder="85" name='mobile_width' value="<?php echo $mobile_width; ?>"/> <br/>
									<input name="mobile_width_par" type="radio" value="px" <?php if($mobile_width_par=='px') { echo 'checked="checked"'; } ?>>px <input name="mobile_width_par" type="radio" value="pr" <?php if($mobile_width_par=='pr' || $mobile_width_par =='') { echo 'checked="checked"'; } ?>> %
								</div>	
							</div>
						</div>
					</div>
					<div id="t3">
						<div class="itembox">
							<div class="item-title">
								<h3>Close Button</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Select a type <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br> 
									<select disabled="disabled">
										<option>Icon close</option>		 	
									</select>	
								</div>
								<div class="wow-admin-col-4">
									Icon shape <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/icon.jpg">
								</div>
								<div class="wow-admin-col-4">
									Also enable closing on:<br>
									Overlay <input name="close_button_overlay" type="checkbox" value="1" <?php if(!empty($close_button_overlay)) { echo 'checked="checked"'; } ?>> Esc  <input name="close_button_esc" type="checkbox" value="1" <?php if(!empty($close_button_esc)) { echo 'checked="checked"'; } ?>>
								</div>
							</div>
							<div class="wow-admin-col">	
								<div class="wow-admin-col-4">
									Size (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="14" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Top position (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="-15" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Right position (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="-15" disabled="disabled" />
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Delay (sec) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="0" disabled="disabled" />
								</div>	
								<div class="wow-admin-col-4"></div>
								<div class="wow-admin-col-4"></div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Background color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>		
								<div class="wow-admin-col-4">
									Color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4"></div>	
							</div>
						</div>
					</div>
					<div id="t4">
						<div class="itembox">
							<div class="item-title">
								<h3>Display a Modal Window</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">
									Show a modal window:<br/>
									<select name='modal_show' id="modal_show" onchange="wpchange();">        
										<option value="load" <?php if($modal_show=='load') { echo 'selected="selected"'; } ?>>When the page loads</option>
										<option value="click" <?php if($modal_show=='click') { echo 'selected="selected"'; } ?>>Click on a link (with id)</option>
										<option value="anchor" <?php if($modal_show=='anchor') { echo 'selected="selected"'; } ?>>Click on a link (with an #anchor link)</option>
										<option value="scroll" <?php if($modal_show=='scroll') { echo 'selected="selected"'; } ?>>When the window is scrolled</option>
										<option value="close" <?php if($modal_show=='close') { echo 'selected="selected"'; } ?>>When the user tries to leave the page</option>	
										<option value="hoverid" <?php if($modal_show=='hoverid') { echo 'selected="selected"'; } ?>>Hover on an element (with id)</option>
										<option value="hoveranchor" <?php if($modal_show=='hoveranchor') { echo 'selected="selected"'; } ?>>Hover on a link (with an #anchor link)</option>
									</select><br/>
									<div id="wpchange1" style="display:none; width:80%; font-size:12px;">
										Add an <b>id='wow-modal-id-X'</b> to the element, where X is the number of the modal window
									</div>
									<div id="wpchange2" style="display:none; width:80%; font-size:12px;">
										Add an anchor to the link: <b>a href='#wow-modal-id-X'</b>, where X is the number of the modal window
									</div>
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-6 wpcookie">
									Show only once? (use cookies):<br/>
									<select name='use_cookies'>
										<option value="no" <?php if($use_cookies=='no') { echo 'selected="selected"'; } ?>>no</option>
										<option value="yes" <?php if($use_cookies=='yes') { echo 'selected="selected"'; } ?>>yes</option>        
									</select>
								</div>
								<div class="wow-admin-col-6 wpcookie">
									Reset in (days):<br/>
									<input type='text'  placeholder="5" name='modal_cookies' value="<?php echo $modal_cookies; ?>"/>
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-6" id="delay">
									Delay (sec):<br/>
									<input type='text'  placeholder="0" name='modal_timer' value="<?php echo $modal_timer; ?>"/> 
								</div>
								<div class="wow-admin-col-6">
									<div class="reached">
										Reach (%) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
										<input type='text'  placeholder="50" disabled="disabled" />
									</div>
								</div>
							</div>
						</div>
						<div class="itembox">
							<div class="item-title">
								<h3>Animation</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-6">
									Animate In <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<select disabled="disabled">
										<option>no</option>
									</select>
								</div>
								<div class="wow-admin-col-6">
									Animation duration (ms) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="400" disabled="disabled" /> 
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-6">
									Animate Out <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<select disabled="disabled">
										<option>no</option>
									</select>
								</div>
								<div class="wow-admin-col-6">
									Animation duration (ms) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="400" disabled="disabled" /> 
								</div>
							</div>
						</div>	
					</div>	
					<div id="t6">
						<div class="itembox">
							<div class="item-title">
								<h3>Modal Window button</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Show button:<br/>
									<select name='umodal_button' onchange="displaybutton();">
										<option value="no" <?php if($umodal_button=='no') { echo 'selected="selected"'; } ?>>no</option>
										<option value="yes" <?php if($umodal_button=='yes') { echo 'selected="selected"'; } ?>>yes</option> 
									</select>
								</div>
								<div class="wow-admin-col-4">
									<div class="showbutton">
										Button position:<br/>
										<select name='umodal_button_position'>
											<option value="wow_modal_button_right" <?php if($umodal_button_position=='wow_modal_button_right') { echo 'selected="selected"'; } ?>><?php esc_attr_e("right", "wow-marketings") ?></option>
											<option value="wow_modal_button_left" <?php if($umodal_button_position=='wow_modal_button_left') { echo 'selected="selected"'; } ?>><?php esc_attr_e("left", "wow-marketings") ?></option>
											<option value="wow_modal_button_top" <?php if($umodal_button_position=='wow_modal_button_top') { echo 'selected="selected"'; } ?>><?php esc_attr_e("top", "wow-marketings") ?></option>
											<option value="wow_modal_button_bottom" <?php if($umodal_button_position=='wow_modal_button_bottom') { echo 'selected="selected"'; } ?>><?php esc_attr_e("bottom", "wow-marketings") ?></option>
										</select>
									</div>
								</div>
								<div class="wow-admin-col-4">
									<div class="showbutton">
										Button's text:<br/>
										<input type="text" name="umodal_button_text" value="<?php echo $umodal_button_text; ?>" placeholder="Feedback"/>
									</div>
								</div>
							</div>
							<div class="wow-admin-col showbutton">
								<div class="wow-admin-col-4">
									Button's text size (em) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="1.2" disabled="disabled" /> 
								</div>
								<div class="wow-admin-col-4">
									Animation <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<select disabled="disabled">
										<option>no</option>										
									</select>								
								</div>
								<div class="wow-admin-col-4">
									Animation duration (sec) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>						
									<input type='text'  placeholder="1" disabled="disabled" /> 
								</div>
							</div>
							<div class="wow-admin-col showbutton">
								<div class="wow-admin-col-4">
									Animation Time (sec) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>						
									<input type='text'  placeholder="5" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Animation Pause (sec) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a> :<br/>						
									<input type='text'  placeholder="5" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4"></div>
							</div>
							<div class="wow-admin-col showbutton">
								<div class="wow-admin-col-4">
									Button Text color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4">
									Button Text hover color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4">
									Button color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
							</div>
							<div class="wow-admin-col showbutton">
								<div class="wow-admin-col-4">
									Button hover color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
								<div class="wow-admin-col-4"></div>
								<div class="wow-admin-col-4"></div>
							</div>
						</div>	
					</div>
					<div id="t7">
						<div class="itembox">
							<div class="item-title">
								<h3>Generate Icon</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Select Icon <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/icon.jpg">	
								</div>							
								<div class="wow-admin-col-4">
									Icon color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
								<div class="wow-admin-col-4">
									Icon size (px) <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="24" disabled="disabled" />
								</div>
							</div>	
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Icon link <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<input type='text'  placeholder="https://wow-estore.com/" disabled="disabled" />									
								</div>
								<div class="wow-admin-col-4">
									Link target <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:<br/>
									<select disabled="disabled">
										<option>_blank</option>																		
									</select>
								</div>
								<div class="wow-admin-col-4"></div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">
									<center><input type="button" value="GENERATE" class="wow-btn"></center>
								</div>	
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">
									<b>Shortcode <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:</b><br/>									
								</div>						
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">
									<b>Preview <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>:</b><br/>									
								</div>						
							</div>
						</div>	
					</div>	
					
					<div id="t8">
						<div class="itembox">
							<div class="item-title">
								<h3>Form</h3>
								Try the free plugin for creating forms <a href="https://wordpress.org/plugins/mwp-forms/" target="_blank">Wow Forms</a> or online calculators <a href="https://wordpress.org/plugins/wpcalc/" target="_blank">Wpcalc</a><p/>
								For insert form into modal window content use tag <b>{form}</b>. Simple insert <b>{form}</b> into popup content
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Name field <input type="checkbox" disabled > <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Your name" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Email field <input type="checkbox" disabled > <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="mail@example.org" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Textarea field <input type="checkbox" disabled > <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Write a Comment" disabled="disabled" />
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Button's text <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Send" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4"></div>
								<div class="wow-admin-col-4"></div>
							</div>
							
						</div>
						<div class="itembox">
							<div class="item-title">
								<h3>Form Style</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">	
									Form width <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="100%" disabled="disabled" />
									
								</div>
								<div class="wow-admin-col-4">
									Form padding <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="10px" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Form border <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="1px" disabled="disabled" />
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">	
									Form border radius <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="0px" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Field border <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="1px" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Field border radius <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="0px" disabled="disabled" />								
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">	
									Text size <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="16px" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Button text size <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="16px" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Input height <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="36px" disabled="disabled" />
								</div>
							</div>
							
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">	
									Textarea height <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="72px" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Form background <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4">
									Form border color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/border.jpg">
								</div>
							</div>
							
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">	
									Field background <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4">
									Field border color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/border.jpg">
								</div>
								<div class="wow-admin-col-4">
									Text color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
							</div>
							
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">	
									Button text color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/white.jpg">
								</div>
								<div class="wow-admin-col-4">
									Button background <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
								<div class="wow-admin-col-4">
									Button hover color <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/> 
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
							</div>						
							
						</div>
						
						<div class="itembox">
							<div class="item-title">
								<h3>Email settings</h3>									
							</div>
							
							<div class="wow-admin-col">	
								<div class="wow-admin-col-4">
									Confirmation text: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Thank you. We will contact you shortly." disabled="disabled" />
								</div>	
								<div class="wow-admin-col-4">
									Confirmation text size: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="16" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4">
									Confirmation text color: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">								
								</div>
								
							</div>	
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">Error text: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>	
								<input type='text'  placeholder="Correct the fields, please" disabled="disabled" />
									
								</div>
								<div class="wow-admin-col-4">Error text size (px): <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
								<input type='text'  placeholder="16" disabled="disabled" />
									
									
								</div>
								<div class="wow-admin-col-4">Error text color: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>								
									<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/black.jpg">
								</div>
								
							</div>	
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Close window after sending in (sec): <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="3" disabled="disabled" />
									
								</div>	
								<div class="wow-admin-col-4">									
										<input type="checkbox" disabled > <a href="https://wordpress.org/plugins/email-marketing-services-integration/" target="_blank">EMS Integration</a> <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>										
																	
									
								</div>	
								<div class="wow-admin-col-4"></div>	
							</div>	
							
						</div>	
						
						<div class="itembox">
							<div class="item-title">
								<h3>Email to Admin</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">
									<input type="checkbox" disabled > Send mail to admin  <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>
								</div>
							</div>
							
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Send to: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="mail@example.com" disabled="disabled" />
									
								</div>	
								
								<div class="wow-admin-col-4">
									Mail subject: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Letter from the site" disabled="disabled" />
								</div>
								<div class="wow-admin-col-4"></div>	
							</div>	
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">			
									<textarea disabled></textarea>
								</div>
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">			
									Enter the text that is sent to email to users after subscribing. HTML is accepted. Available template tags.
									<p />
									<i>{email} - User email</i><br/>
									<i>{name} - User Name </i><br/>
									<i>{text} - Email Text </i><br/>
								</div>
							</div>
						</div>
						
						<div class="itembox">
							<div class="item-title">
								<h3>Email to User</h3>									
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">
									<input type="checkbox" disabled > Send mail to admin <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>
								</div>
							</div>
							
							<div class="wow-admin-col">
								<div class="wow-admin-col-4">
									Email from: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="mail@example.com" disabled="disabled" />
									
								</div>	
								
								<div class="wow-admin-col-4">
									Mail subject: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Letter from the site" disabled="disabled" />
									
								</div>
								<div class="wow-admin-col-4">
									Text from: <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br/>
									<input type='text'  placeholder="Website" disabled="disabled" />
									
									
								</div>	
							</div>
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">			
									<textarea disabled></textarea>
								</div>
							</div>														
							<div class="wow-admin-col">
								<div class="wow-admin-col-12">			
									Enter the text that is sent to email to users after subscribing. HTML is accepted. Available template tags.
									<p />
									<i>{email} - User email</i><br/>
									<i>{name} - User Name </i><br/>
									<i>{text} - Email Text </i><br/>
								</div>
							</div>
							
							
						</div>
						
						
					</div>
					
					
					
					
					
					
					
				</div>
			</div>			
		</div>
		<div id="wow-rightcol">
			<div class="wowbox">
				<h3>Publish</h3>
				<div class="wow-admin" style="display: block;">
					<div class="wow-admin-col">
						<div class="wow-admin-col-6">
							<?php if ($id != ""){ echo '<p class="wowdel"><a href="admin.php?page='.$pluginname.'&info=del&did='.$id.'">Delete</a></p>';}; ?>
						</div>
						<div class="wow-admin-col-6 right">
							<p/>
							<input name="submit" id="submit" class="button button-primary" value="<?php echo $btn; ?>" type="submit">
						</div>
					</div>
				</div>
			</div>
			<div class="wowbox">
				<h3>Display</h3>
				<div class="inside wow-admin" style="display: block;">
					<div class="wow-admin-col wow-wrap">
						<div class="wow-admin-col-12">
							Show for users: <br/>
							<input type="radio" checked="checked"> All users <br />
							<input type="radio" disabled="disabled"> If a user logged in <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a><br />
							<input type="radio" disabled="disabled"> If user not logged <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a> 
						</div>	
						<div class="wow-admin-col-12">
							<input type="checkbox" disabled="disabled"> Show after popup<a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>							
						</div>
						<div class="wow-admin-col-12">
							<input type="checkbox" disabled="disabled"> Don’t show on screens less than (px)<a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>							
						</div>
						<div class="wow-admin-col-12">
							<input type="checkbox" disabled="disabled"> Depending on the language <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Only Pro version"><span class="dashicons dashicons-lock" style="color:#37c781;"></span></a>
						</div>
						<div class="wow-admin-col-12">
							Show modal window  :<br/>							
							<select name='umodal_window_show' onchange="showchange();" >
								<option value="shortecode" <?php if($umodal_window_show=='shortecode') { echo 'selected="selected"'; } ?>>Where shortcode is inserted</option>
								<option value="all" <?php if($umodal_window_show=='all') { echo 'selected="selected"'; } ?>>All posts and pages</option>
							</select>	
							More function on <a href='admin.php?page=<?php echo $pluginname;?>&tool=pro' title="Get More">pro version</a>
						</div>
						<div class="wow-admin-col-12" style="display:none;" id="shortcode">
							<b>[Wow-Modal-Windows  id=<?php echo $id; ?>]</b>
						</div>
					</div>
				</div>
			</div>
			<div class="wowbox">
				<center><img src="<?php echo plugin_dir_url( __FILE__ ); ?>thankyou.png" alt=""  /></center>
				<hr/>				
				<div class="wow-admin wow-plugins">
					<p>We will be very grateful if you <a href="https://wordpress.org/plugins/modal-window/" target="_blank"><b>leave a review about the plugin</b></a>.</p>
					<p>If you have suggestions on how to improve the plugin or create a new plugin, write to us via the <a href="admin.php?page=<?php echo $pluginname;?>&tool=support" target="_blank"><b>support form</b></a></p>					
					<p>We really appreciate your reviews and suggestions for improving the plugin.</p>
					<p>					
					<b><em>Thank you for choosing the plugin from Wow-Company! </em></b></p>
					<em><b>Best Regards</b>,<br/>						
						<a href="https://wow-estore.com/" target="_blank">Wow-Company Team</a><br/>
						Dmytro Lobov<br/>
						<a href="mailto:support@wow-company.com">support@wow-company.com</a>
					</em>
					
				</div>
			</div>
		</div>
	</div>	    
	<input type="hidden" name="add" value="<?php echo $hidval; ?>" />    
	<input type="hidden" name="id" value="<?php echo $id; ?>" />
	<input type="hidden" name="data" value="<?php echo $data; ?>" />
	<input type="hidden" name="page" value="<?php echo $pluginname;?>" />	
	<input type="hidden" name="plugdir" value="<?php echo $pluginname;?>" />		
	<?php wp_nonce_field('wow_plugin_action','wow_plugin_nonce_field'); ?>
</form>