/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import { LogService } from "@rbxts/services";
import { warnAlreadyDestroyed } from "./WarnAlreadyDestroyed";

class Destroyable {}

export = () => {
	it("should warn with a message that includes class name", () => {
		const destroyable = new Destroyable();
		const className = tostring(getmetatable(destroyable));

		let wasExpectedWarningOutputted = false;
		const messageOutConnection = LogService.MessageOut.Connect((message, messageType) => {
			if (messageType !== Enum.MessageType.MessageWarning) {
				return;
			}

			if (message.find(className) === undefined) {
				return;
			}

			wasExpectedWarningOutputted = true;
		});

		warnAlreadyDestroyed(destroyable);

		task.wait(0.2);

		messageOutConnection.Disconnect();

		expect(wasExpectedWarningOutputted).to.equal(true);
	});
};
