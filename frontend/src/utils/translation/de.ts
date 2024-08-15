import { b } from "vitest/dist/suite-IbNSsUWN";
import { base64ToUtf8 } from "../encoder";

export const de_translation = {
	selected_language: "🇩",
	status_connected: "Verbunden",
	status_disconnected: "Getrennt",
	prefer_pic_url: "Bevorzuge Bild-URL",
	language_selection: "Wählen Sie eine Sprache",
	loading_app: "Lade Applikation..",
	missing_env_vars: "Fehlende Umgebungsvariablen",
	client_name: "Client Name",
	client_name_placeholder: "z.B. Workstation",
	socket_ip: "Socket IP",
	socket_port: "Socket Port",
	cancel: "Abbrechen",
	save_env_vars: "Speichern",
	saving_env_vars: "Speichere..",
	unknown: "Unbekannt",
	menu_item_reply: "Antworten",
	menu_item_edit: "Bearbeiten",
	menu_item_delete: "Löschen",
	button_send: "Senden",
	picture_preview_label: "Bild-Vorschau",
	chat_input_placeholder: "Nachricht eingeben..",
	button_unread: "Ungelesene Nachrichten",
	button_reconnect: "Erneut verbinden",
	profile_modal_title: "Bearbeite das Nutzerprofil",
	menu_item_profile: " Profil Bearbeiten",
	menu_item_reload: " Applikation neu laden",
	menu_item_force: " Warnung erzwingen",
	textarea_placeholder_image_drop_here: "Lassen Sie das Bild hier los..",
	adjust_font_size: "Schriftgröße anpassen",
	client_not_found: "Der Nutzer konnte nicht gefunden werden, bitte warten..",
	menu_item_do_not_disturb: " Bitte nicht stören!",
	unread_messages_count: "Ungelesene Nachrichten",
	below_unread_messages_start: "NEUE NACHRICHTEN AB HIER",
	menu_item_info: " Info",
	menu_item_banner: " Banners",
	profile_menu_item_language_en: " Englisch",
	profile_menu_item_language_de: " Deutsch",
	profile_menu_save_button: "Speichern",
	profile_menu_cancel_button: "Abbrechen",
	profile_menu_profile_color_label: "Profilfarbe",
	profile_menu_font_size_label: "Schriftgröße",
	profile_menu_item_name: "Benutzername",
	timer_time_left: "Minuten verbleiben",
	header_do_not_disturb_label: "Bitte nicht stören: ",
	loading_label: "Lade..",
	settings_save_button: "SPEICHERN",
	settings_cancel_button: "ABBRECHEN",
	edited_label: "bearbeitet",
	save_edit_button: "Speichern",
	cancel_edit_button: "Abbrechen",
	menu_attachment_image: " Bild",
	deleted_message: "Nachricht gelöscht",
	settings_label_availability: "Verfügbarkeit",
	availability_warning:
		"Wenn Sie den Verfügbarkeitsmodus aktivieren, werden Sie umgehend bei Hilfeanforderungen benachrichtigt.",
	title_svg_settings:
		"Öffnet das Einstellungsmenü und erlaubt es Ihnen, die App Einstellungen zu ändern.",
	title_svg_connected: "Sie sind mit dem Websocket Server verbunden.",
	title_svg_info:
		"Öffnet ein Info-Modal, das Informationen über die App enthält.",
	title_svg_do_not_disturb:
		"Verhindert für 5 Minuten, dass Benachrichtigungen angezeigt werden. Wird automatisch zurückgesetzt.",
	title_svg_force_warning:
		"Öffnet ein Modal, mit dem Sie Warnungen an andere Nutzer senden können. Sie können das Chatprogramm des Nutzers in den Vordergrund bringen und Desktop-Benachrichtigungen senden.",
	title_svg_reload: "Gibt Ihnen die Möglichkeit, die App neu zu laden.",
	title_svg_change_font_size: "Ändert Sie die Schriftgröße der App.",
	title_svg_availability:
		"Sie erklären sich bereit auf Hilfeanforderungen zu reagieren und diese zu erhalten.\n\nKlick: Starte einen Notfall Chat!",
	title_svg_disconnected: "Sie sind nicht mit dem Server verbunden.",
	title_svg_germany_flag:
		"Die App Sprache auf Deutsch.\n\nKlick: Ändert die App Sprache auf Englisch.",
	title_svg_english_flag:
		"Die App Sprache ist nun Englisch.\n\nKlick: Ändert die App Sprache auf Deutsch.",
	title_svg_paper_clip: "Fügen Sie diverse Daten in Ihrem Chat hinzu.",
	title_svg_emoji_menu: "Öffnet das Emoji Menü.",
	title_svg_camera: "Wählen Sie ein Bild aus.",
	title_svg_send_button: "Senden Sie die von Ihnen eingegebene Nachricht.",
	title_svg_unread_messages: "Sie haben {{count}} ungelesene Nachricht(en).",
	title_svg_american_flag:
		"Die App Sprache ist nun Englisch.\n\nKlick: Ändert die App Sprache auf Deutsch.",
	title_svg_german_flag:
		"Die App Sprache auf Deutsch.\n\nKlick: Ändert die App Sprache auf Englisch.",
	title_svg_help_caller: "Client, der die Hilfe angefordert hat.",
	title_svg_banner_list:
		"Liste der Banner. Klicken Sie, um die Auflistung der aktiven Banner zu sehen.",
	title_svg_add_banner_button: "Hinzufügen eines neuen Banners.",
	title_svg_hide_banner:
		"Banner Status: ausgeblendet.\n\nKlicken Sie hier, um diesen Banner einzublenden.",
	title_svg_unhide_banner:
		"Banner Status: eingeblendet.\n\nKlicken Sie hier, um diesen Banner auszublenden.",
	title_svg_delete_banner: "Klicken Sie hier, um diesen Banner zu löschen.",
	title_svg_edit_banner: "Klicken Sie hier, um diesen Banner zu bearbeiten.",
	title_svg_back_button: "Gehen Sie zurück zur vorherigen Seite.",
	title_svg_banner_icon:
		"Öffnet das Banner-Menü und erlaubt es, Banner hinzuzufügen, zu bearbeiten und zu löschen.",
	label_add_banner: "Neuen Banner hinzufügen: ",
	banner_delete_confirm_1: "Sind Sie sicher?",
	banner_delete_confirm_2: "Dieser Banner wird für alle User gelöscht!",
	banner_delete_confirm_3: "Klicken Sie erneut zum Bestätigen.",
	banner_overview_header_title: "Titel",
	banner_overview_header_message: "Nachricht",
	banner_overview_header_priority: "Priorität",
	banner_overview_header_actions: "Aktionen",
	banner_add_modal_label_title: "Titel",
	banner_add_modal_label_message: "Nachricht",
	banner_add_modal_label_priority: "Priorität",
	banner_add_modal_label_priority_explanation:
		"Je höher die Priorität, desto länger bleibt das Slide sichtbar.",
	banner_add_modal_button_cancel: "Abbrechen",
	banner_add_modal_button_save: "Speichern",
	font_size_preview_label: "Vorschau der Schriftgröße:",
	emergency_validation_text: "Möchten Sie den Notfall Chat initialisieren?",
	emergency_validation_button_start: "Start",
	emergency_chat_menu_item_end: "Notfall Chat beenden",
	emergency_chat_header_dots_menu: "Menü Optionen für den Notfall Chat",
	emergency_chat_header_text: "{{initiatorName}} - Notfall Chat",
	emergency_chat_init_text: "{{initiatorName}} benötigt deine Hilfe!",
	filetype_not_allowed: "Nur PNG, JPG und JPEG Dateien sind erlaubt.",
	devmode_banner: "Entwicklermodus",
	update_available: "Update verfügbar",
};