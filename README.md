# Destroyed Instance Logging
<p align="center">
  <a href="https://github.com/Bytebit-Org/roblox-DestroyedInstanceLogging/actions">
      <img src="https://github.com/Bytebit-Org/roblox-DestroyedInstanceLogging/workflows/CI/badge.svg" alt="CI status" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-blue.svg" alt="PRs Welcome" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  </a>
  <a href="https://discord.gg/QEz3v8y">
    <img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" alt="Discord server" />
  </a>
</p>

Destroyed Instance Logging is just a simple set of functions for making consistent destroyed instance logs.

## Installation
### roblox-ts
Simply install to your [roblox-ts](https://roblox-ts.com/) project as follows:
```
npm i @rbxts/destroyed-instance-logging
```

### Wally
[Wally](https://github.com/UpliftGames/wally/) users can install this package by adding the following line to their `Wally.toml` under `[dependencies]`:
```
DestroyedInstanceLogging = "bytebit/destroyed-instance-logging@1.0.4"
```

Then just run `wally install`.

### From model file
Model files are uploaded to every release as `.rbxmx` files. You can download the file from the [Releases page](https://github.com/Bytebit-Org/roblox-DestroyedInstanceLogging/releases) and load it into your project however you see fit.

### From model asset
New versions of the asset are uploaded with every release. The asset can be added to your Roblox Inventory and then inserted into your Place via Toolbox by getting it [here.](https://www.roblox.com/library/9164245379/Destroyed-Instance-Logging-Package)

## Documentation
Documentation can be found [here](https://github.com/Bytebit-Org/roblox-DestroyedInstanceLogging/tree/master/docs), is included in the TypeScript files directly, and was generated using [TypeDoc](https://typedoc.org/).

## Example
Here's a simple example of a destroyable class with a couple public methods on it that we want to make sure logs consistently when a destroyed instance is misused.

<details>
  <summary>roblox-ts example</summary>

  ```ts
  import { assertNotDestroyed, warnAlreadyDestroyed } from "@rbxts/destroyed-instance-logging";

  export class Destroyable {
    private isDestroyed = false;

    public destroy() {
      if (this.isDestroyed) {
        warnAlreadyDestroyed(this);
        return;
      }

      // destruction logic
      this.isDestroyed = true;
    }

    public foobar() {
      assertNotDestroyed(this.isDestroyed, this);

      // foobar logic
    }
  }
  ```
</details>

<details>
  <summary>Luau example</summary>

  ```lua
  local assertNotDestroyed = require(path.to.modules["destroyed-instance-logging"]).assertNotDestroyed
  local warnAlreadyDestroyed = require(path.to.modules["destroyed-instance-logging"]).warnAlreadyDestroyed

  local Destroyable = {}
  Destroyable.__index = Destroyable

  function new()
    local self = {}
    setmetatable(self, Destroyable)

    self.isDestroyed = false

    return self
  end

  function Destroyable:destroy()
    if self.isDestroyed then
      warnAlreadyDestroyed(self)
      return
    end

    -- destruction logic
    self.isDestroyed = true
  end

  function Destroyable:foobar()
    assertNotDestroyed(self.isDestroyed, self)

    -- foobar logic
  end

  return {
    new = new
  }
  ```
</details>
