/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import { assertNotDestroyed } from "./AssertNotDestroyed";

class Destroyable {
	public isDestroyed = false;

	public doSomething() {
		assertNotDestroyed(this.isDestroyed, this);
	}
}

export = () => {
	it("should not throw unless the object is destroyed, but should throw message that includes class name if so", () => {
		const destroyable = new Destroyable();
		const className = tostring(getmetatable(destroyable));

		destroyable.doSomething(); // shouldn't throw

		destroyable.isDestroyed = true;
		const opcallResult = opcall(() => destroyable.doSomething());
		assert(!opcallResult.success, "Expected the method to throw");
		assert(
			opcallResult.error.find(className) !== undefined,
			`Expected the error message to contain the class name "${className}". Error message: ${opcallResult.error}`,
		);
	});
};
