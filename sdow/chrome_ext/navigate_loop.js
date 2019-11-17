
start = "Mikhail_Gorbachev"
target = "United_States_Army"
current = start

function send_recommend_pages(source, target) {
    var http = new XMLHttpRequest();
    var url = 'http://localhost:5001/recommend_page';
    var jsonData = JSON.stringify({
        'source':source,
        'target':target
    });
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            processResponse(http.responseText);
        }
    }
    console.log('Sending to /recommend_page : ', jsonData)
    http.send(jsonData);
}

function processResponse(ai_recomend_response) {
    respData = JSON.parse(ai_recomend_response)
    console.log(respData)
    current = respData.title[0]

    tree = document.getElementById('tree')
    tree.innerText += '\n'+current
    if(target == current) {
        
        tree.innerText += '\n\n Looks like the AI found its way!!'
        alert('AI WINS!!')
        return
    }
    
    setTimeout(function() {
        if(window.STOP) {return;}
        send_recommend_pages(current, target)
    }, 2000)
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
        sendResponse({});
        user_current = request.href.match(/\w+$/)[0]
        document.getElementById('user_tree').innerHTML+='\n\n'+user_current

        if(user_current == target) {
            stop_timer()
            window.STOP=true
            document.getElementById('user_tree').innerHTML+='\n\n Congrats you did it!'
            alert('Humans are still smarter!')

        }
        
    });


