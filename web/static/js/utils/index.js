export const throttle = (func, wait) => {	 
	
	let previousExecutionTime = 0;
	let context, args, prevArgs, argsChanged, result; let previous = 0;
	
	return function() {

		let currentTime, remaining;

		if (wait) {
			currentTime = Date.now();
			remaining = wait - (currentTime - previousExecutionTime);	
		}

		args = arguments;
		argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs);
		prevArgs = {...args};

		if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
			if(wait){ 
				previous = currentTime;
      }
      result = func.apply(context, args);
      context = args = null;
      return result;
		}		 				
	}
}

 
