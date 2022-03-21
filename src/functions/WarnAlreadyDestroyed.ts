export function warnAlreadyDestroyed(destroyedObject: object) {
	warn(
		debug.traceback(`Attempt to destroy an already destroyed instance of type "${getmetatable(destroyedObject)}"`),
	);
}
