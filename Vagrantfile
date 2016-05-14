# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo "Installing NodeJS..."
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
#sudo apt-get install -y build-essential
SCRIPT

Vagrant.configure(2) do |config|

    config.vm.box = "ubuntu/trusty64"
    # config.vm.synced_folder ".", "/vagrant"
    config.vm.synced_folder ".", "/vagrant", mount_options: ["dmode=700,fmode=600"]
    config.vm.box_check_update = false

  config.vm.synced_folder  ".", "/vagrant", type: "rsync",  rsync__exclude: [".git/", ".idea/", "node_modules", ".vagrant"]

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "2048"
        vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    end

    config.vm.define :dev do |dev|
        dev.vm.network :forwarded_port, host: 8080, guest: 8080
        dev.vm.hostname = "flashcards"
        dev.vm.provision "shell", inline: $script
    end

end