# localchat
<img src="pictures/main.png" height="750">

## About

##### Why Another Chat App?

I work with sensitive data that requires strict privacy measures. I need to communicate within a local network and ensure that no network requests go to external servers and no messages are stored on external servers.

localchat is the client part of my little chat application.

## Features
- group chat with multiple clients
- typing indicators
- reactions
- banners
- emergency chat
clients are able to request help via the emergency chat. clients marked as available will receive a notification, whilst unavailable clients will not; hence those clients will not be disturbed. the chat will prompt the helping users to help. these messages will not be persisted
- profile picture caching
- do not disturb mode
- emoji picker and emoji reactions

## Technologies
- [Wails](https://wails.io/)
	- Wails is a project that enables you to write desktop apps using Go and web technologies.
- [React](https://react.dev/) via [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Vitest](https://vitest.dev/)
- [SQLite](https://www.sqlite.org/index.html)

## Usage
download golang and wails

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

```bash
wails build
sudo chmod +x ./build/bin/localchat
./build/bin/localchat
```

or simply use the prebuild binary from github actions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Additional Screenshots

###### Banner
![banner_modal](pictures/banner_modal.png)

![banner_new](pictures/banner_new.png)

###### Chat Panel
![bubble_edit](pictures/bubble_edit.png)

![bubble_reaction](pictures/bubble_reaction.png)

![bubble_reaction_picker](pictures/bubble_reaction_picker.png)

![bubble_reply](pictures/bubble_reply.png)

![chat_image](pictures/chat_image.png)

###### Emergency
![header_emergency_picker](pictures/header_emergency_picker.png)

![emergency_chat](pictures/emergency_chat.png)

###### Header
![header_dnd](pictures/header_dnd.png)

![header_font_size_picker](pictures/header_font_size_picker.png)

![header_menu](pictures/header_menu.png)

![input_emoji_picker](pictures/input_emoji_picker.png)

###### Input Area
![preview_image](pictures/preview_image.png)

![menu_image](pictures/menu_image.png)

![input_reply](pictures/input_reply.png)

###### Settings
![settings_modal](pictures/settings_modal.png)


