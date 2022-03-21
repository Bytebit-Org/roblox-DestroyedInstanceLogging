export function assertNotDestroyed(isDestroyed: boolean, destroyedObject: object) {
	if (isDestroyed) {
		throw `Attempt to call method on a destroyed instance of type "${getmetatable(destroyedObject)}"`;
	}
}
