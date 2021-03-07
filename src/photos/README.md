#Add/Edit form.
When we send form data we set add/edit loading, but if we close form before request complete, we set loading to false and anotherForm to true. Cause if we open new form we can send new request. AnotherForm needs to previous request - it set hide form on success. We set anotherForm to true on start new request and to false when close form.
