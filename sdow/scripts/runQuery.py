import sqlite3
import helpers as helpers

sdow_database='./sdow.sqlite'
sdow_conn = sqlite3.connect(sdow_database, check_same_thread=False)
sdow_cursor = sdow_conn.cursor()

query = 'SELECT * FROM pages where is_redirect < 1;'
# sanitized_page_title = helpers.get_sanitized_page_title(page_title)
# query_bindings = (sanitized_page_title,)
sdow_cursor.execute(query)
results = sdow_cursor.fetchall()

for current_page_id, current_page_title, current_page_is_redirect in results:
    print current_page_id, current_page_title, current_page_is_redirect