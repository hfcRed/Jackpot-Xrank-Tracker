<div align="center">

# jackpot-xrank-tracker

Source code for the frontend of the [jackpot xrank tracker](https://jackpot-xrank-tracker.pages.dev) for displaying the position of the team members on the Top 500 X-Rank leaderboards

![chrome_5RbZ2BY2hM](https://github.com/hfcRed/jackpot-xrank-tracker/assets/101019309/7324d334-07ce-43c8-8496-f4489f9d59ba)

</div>

---

## Tech Stack

### Frontend

* Astro
* Tailwind
* Vanilla JS

### Other

* Sortable list from [SortableJS](https://github.com/SortableJS/Sortable)
* Splatoon font from [NorthWestWind](https://github.com/North-West-Wind/splatoon3-fonts)
* Game data and images from [Leanny](https://github.com/Leanny/splat3)

## Running locally

If you dont already have NVM installed, download the latest ``nvm-setup.zip`` from [here](https://github.com/coreybutler/nvm-windows/releases), then extract the zip and run the installer.

If you are on a Unix based machine like Linux or MacOS, run the following command to install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

You can verify that NVM is installed by running:

```bash
nvm --version
```

After installing NVM run the following commands in the directory of the project:

* ``nvm use`` to switch to the required Node version.
  * If the required version is not installed, you will be prompted to run the ``nvm install`` command.
  * After installing the required version, run ``nvm use`` again
* ``npm install`` to install the dependencies

To start testing locally you can use the following commands:

* ``npm run dev`` to start a local dev server at ``localhost:4321``
* ``npm run build`` to create a build of the website
* ``npm run preview`` to preview the build at ``localhost:4321``
