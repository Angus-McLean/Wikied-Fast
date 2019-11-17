var obj_registry = new Array();

function register_object(obj) {
  obj.private_obj_params = new Array(0);

  obj_registry[obj_registry.length] = obj;
  obj.private_obj_params["registry_id"] = obj_registry.length - 1;

  obj.get = stdobj_get;
  obj.set = stdobj_set;
}

function stdobj_get(param) {
  if(typeof(this.private_obj_params[param]) != "undefined")
    return this.private_obj_params[param]
  else
    return undefined;
}

function stdobj_set(param, val) {
  this.private_obj_params[param] = val
}


function StopWatch() {
  register_object(this);
  this.reset();
}

function StopWatch_start() {
if(!this.get("clock_running")) {
  this.set("start_time", new Date());
  this.set("clock_running", true);
}
}
StopWatch.prototype.start = StopWatch_start;

function StopWatch_stop() {
if(this.get("clock_running")) {
  this.set("stored_elapsed", this.elapsed());
  this.set("clock_running", false);
}
}
StopWatch.prototype.stop = StopWatch_stop;

function StopWatch_reset() {
if(!this.get("clock_running")) {
  this.set("stored_elapsed", 0);
  this.set("start_time", 0);
}
}
StopWatch.prototype.reset = StopWatch_reset;

function StopWatch_elapsed() {
if(this.get("clock_running"))
  return (new Date() - this.get("start_time")) + this.get("stored_elapsed");
else
  return this.get("stored_elapsed");
}
StopWatch.prototype.elapsed = StopWatch_elapsed;

function StopWatch_running() {
return this.get("clock_running");
}
StopWatch.prototype.running = StopWatch_running;

function StopWatch_start_time() {
return this.get("start_time");
}
StopWatch.prototype.start_time = StopWatch_start_time;
