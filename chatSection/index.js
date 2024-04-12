
const loadData = () => {
    const appWrapper = document.getElementsByClassName("app-wrapper")[0]
    const chatWrapper = document.getElementsByClassName("chat-wrapper")[0]
    const chatList = document.getElementsByClassName("chat-list")[0]
    const conversationWrapper = document.getElementsByClassName("conversation-wrapper")[0]
    const conversationList = document.getElementsByClassName("conversation-list")[0]
    const chatInput = document.getElementsByClassName("chat-input")[0]
    const chatButton = document.getElementsByClassName("chat-send")[0]
    const searchInput = document.getElementsByClassName("search-input")[0]

    const chatData = [
        {id: 1, title: "title1", conversation: [
            {
                message: "userMessage1userMessage1userMessage1userMessage1userMessage1",
                src: "user"
            },
            {
                message: "yourMessag1",
                src: "you"
            },
            {
                message: "userMessage2",
                src: "user"
            },
            {
                message: "yourMessag2",
                src: "you"
            },
            {
                message: "userMessage2",
                src: "user"
            },
        ]},
        {id: 2, title: "title2", conversation: [
            {
                message: "userMessage1",
                src: "user"
            },
            {
                message: "yourMessag1",
                src: "you"
            },
            {
                message: "title1",
                src: "user"
            },
            {
                message: "yourMessag2",
                src: "you"
            }
        ]},
        {id: 3, title: "title3", conversation: [
            {
                message: "userMessage1",
                src: "user"
            },
            {
                message: "yourMessag1",
                src: "title2"
            },
            {
                message: "userMessage2",
                src: "user"
            },
            {
                message: "yourMessag2",
                src: "you"
            }
        ]}
    ]

    let selectedChatId = chatData?.[0]?.id

    const debounce = (timeout) => {
        let timerId;
        return (fn) => {
            if(timerId)
                clearTimeout(timerId)
            timerId = setTimeout(()=> {
                timerId = null
                fn()
            }, timeout)
        }
    }

    const debouncedFn = debounce(1600)

    const createLIElement = (title, id) => {
        const LITag = document.createElement("li")
        LITag.setAttribute("key", id)
        LITag.classList.add("conversation-li")
        LITag.innerText = title
        return LITag
    }

    const renderChat = (data) => {
        chatList.innerHTML = ``
        data?.forEach(conversation => {
            chatList.append(createLIElement(conversation?.title, conversation?.id))
        })
    }

    const createConversation = (data) => {
        const conversationLI = document.createElement("li")
        conversationLI.classList.add("message")
        if(data?.src == "user")
            conversationLI.classList.add("user-message")
        else
            conversationLI.classList.add("your-message")

        conversationLI.innerText = data?.message
        return conversationLI
    }

    const getSelectedChat = (id) => {
        return chatData?.filter(chat => chat?.id == id)[0]
    }

    const renderConversation = (id) => {
        const selectedChat = getSelectedChat(id)
        conversationList.innerHTML = ""
        selectedChat?.conversation?.forEach(chat => {
            conversationList.append(createConversation(chat))
        })
    }

    const handleChatSelection = (e) => {
        const id = e.target.getAttribute("key")
        selectedChatId = id
        renderConversation(selectedChatId)
    }

    const createYourMessage = () => {
        const newMessage = chatInput?.value
        if(!chatInput?.value?.trim()) return 
        chatInput.value = ""
        return ({
            message: newMessage,
            src: "you"
        })
    }

    const onSendClick = () => {
        const newMessageObj = createYourMessage()
        if(!!newMessageObj){
            chatData?.filter(chat => chat?.id === selectedChatId)?.[0]?.conversation?.push(newMessageObj)
            render()
        }
    }

    const ifSearchKeyMatches = (key, data) => {
        if(Array.isArray(data)){
            for(let i = 0; i< data?.length; i++){
                if(ifSearchKeyMatches(key, data[i]))
                return true
            }
        }else if(data !== null && typeof data == 'object'){
            const keys = Object.keys(data)
            for(let i = 0; i< keys?.length; i++){
                if(ifSearchKeyMatches(key, data?.[keys?.[i]]))
                return true
            }
        }else{
            if(data?.toString()?.includes(key))
                return true
        }
        return false
    }

    const filterChats = () => {
        const key = searchInput?.value?.trim();

        if(!!key){
            const filteredChatData = chatData?.filter(chat => {
                const result = ifSearchKeyMatches(key, chat)
                return result
            })
            renderChat(filteredChatData)
        }else{
            renderChat(chatData)
        }
    }

    const onSearchTextChange = () => {
            debouncedFn(filterChats)
    }

    chatList?.addEventListener('click', handleChatSelection)
    chatButton?.addEventListener('click', onSendClick)
    searchInput?.addEventListener('keydown', onSearchTextChange)

    const render = () => {
        renderChat(chatData)
        renderConversation(selectedChatId)
    }

    render()
}

document.addEventListener("DOMContentLoaded", function() {
   loadData()
});
