echo "================================================================================"
echo "                      Keepscape Workspace Bootstrap Script                       "
echo "================================================================================"
echo ""
echo "Checking if script is in root directory of keepscape-app"
echo ""

# if [ -f ./src/App.js ]; then
#     echo "Check Success"
# else 
#     echo "Check Failed. Please place this file in the root directory of keepscape-app "
#     exit
# fi

# installs the three extensions required for code formatting
echo ""
echo "Installing Required VS Code Extensions"
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension rvest.vs-code-prettier-eslint

# installs optional but recommended extensions that
# can be used during development
echo ""
while true; do
    read -p "Do you wish to install Recommended Extensions? [y/n] " yn
    case $yn in
        [Yy]* ) code --install-extension VisualStudioExptTeam.vscodeintellicode; code --install-extension eamodio.gitlens; break;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done

clear
# installs npm modules for prettier, eslint, and eselint configs
echo "Installing npm modules for ESLint"
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react

echo "Done!"