
      function initialize() {
        reset_timer();
      }

      setTimeout(function(){
          document.getElementById('button').addEventListener('click', pushbutton)
      },500)

      function pushbutton() {
        if(timer.running()) {
          stop_timer();
          document.getElementById("button").innerHTML = "Start!";
        }
        else {
          console.log(pages)
          var source_page = random_page(pages);
          var target_page = random_page(pages);
          document.getElementById("wiki_frame").src = "https://en.wikipedia.org/wiki/" + source_page;
          document.getElementById("target").innerHTML = target_page.replace("_", " ");
          start_timer();
          document.getElementById("button").innerHTML = "Stop!";
        }
      }

      function start_timer() {
        reset_timer();
        timer.start();
        
        send_recommend_pages(current, target)
        setTimeout(function() {
            tree = document.getElementById('tree')
            tree.innerText += '\n Start the Race!! \n'+start+' - '+target
        })
        
        show_time();
      }

      function stop_timer() {
        timer.stop();
        clearTimeout(timer.timer_id);

        show_time();
      }

      function show_time() {
          document.getElementById('elapsed_time').innerHTML = format_time(timer.elapsed());
          if(timer.running()) { timer.timer_id = setTimeout(show_time, 15); }
      }

      function format_time(time) {
        time *= 1;
        timer.time_segments[0] = lpad(Math.floor(time / 60000), 2, "0"); time %= 60000;
        timer.time_segments[1] = lpad(Math.floor(time / 1000), 2, "0"); time %= 1000;
        timer.time_segments[2] = lpad(Math.floor(time / 10), 2, "0", true);

        return timer.time_segments[0] + ":" + timer.time_segments[1] + "." + timer.time_segments[2];
      }

      function reset_timer() {
        if(!timer.running()) {
          for(var i = 0; i < timer.time_segments.length; i++) timer.time_segments[i] = "00";
          timer.reset();
          show_time();
        }
      }

      function lpad(s, l, c, t) {
        s += "";
        c = c || " ";
        while(s.length < l)
          s = c + s;
        return t && s.length > l ? s.substr(0, l) : s;
      }

      var timer = new StopWatch();
      timer.time_segments = new Array();
      timer.timer_id = 0;

      window.addEventListener("message",
        function (event) {
          document.getElementById("test").innerHTML = event.data;
        });

        // var pages = fetch('subset-dump-pageIds.json')
        //   .then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(function(error){console.log(error);});
        var pages = [
         {
          "pageid": "1814",
          "title": "Adam_Smith"
         },
         {
          "pageid": "3356",
          "title": "Bill_Clinton"
         },
         {
          "pageid": "3747",
          "title": "Bill_Gates"
         },
         {
          "pageid": "8182",
          "title": "Dwight_D._Eisenhower"
         },
         {
          "pageid": "9223",
          "title": "Economics"
         },
         {
          "pageid": "10979",
          "title": "Franklin_D._Roosevelt"
         },
         {
          "pageid": "11826",
          "title": "Free_market"
         },
         {
          "pageid": "11955",
          "title": "George_H._W._Bush"
         },
         {
          "pageid": "13765",
          "title": "Henry_Kissinger"
        }];
        function random_page(pages) {
          var page = pages[Math.floor(Math.random() * pages.length)].title;
          return page;
        };
