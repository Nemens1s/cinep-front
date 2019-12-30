For windows.
Connect to instance with putty.
Everything is done in putty terminal on the server.
1 Install nginx:
    sudo apt-get install nginx
    press y and enter
    now there should be welcoming page from nginx
 1.1 To show custom html:
    Make directory, where the files is going to be. 
    In this case go to cd /home/gitlab-runner 
    Change user to gitlab-runner:
    sudo su gitlab-runner
    mkdir front-deployment
    create file 
      touch index.html
    open it 
      nano index.html
    write something and save
    Then go to nginx folder 
      cd /etc/nginx
      cd /sites-available
    copy default file 
      sudo cp default cinep
    make symlink from sites-enabled to sites-available
      sudo ln -s /etc/nginx/sites-available/cinep /etc/nginx/sites-enabled/
    remove default
      sudo rm default
    go to /var/www
    make another symlink
     sudo ln -s /gitlab-runner/front/deployment /var/www/front-deployment
    go to sites-available
    then open your file
    sudo nano cinep
    in root property make it /var/www/front-deployment
    restart nginx service
    sudo service nginx restart
 1.2 Add proxy to see back-end
    sudo nano cinep
    locate location (no pun intended)
    location /api/{
      proxy_pass http://localhost:8080;
    }
    save
    restart service
    
 2.  Install gitlab-runner
     Since server already has gitlab-runner installed, we only need to register a new runner.
     sudo gitlab-runner register
     Follow the instructions.
     Executor shell
     Add description
     Add tags: cinep-front
     
     2.1 .gitlab-ci.yml
         create file and write(copy) script
         stages:
           - build
           - deploy
         
         build cinep-front:
           stage: build
           image: node:11-alpine
           cache:
             paths:
               - node_modules
           artifacts:
             paths:
               - dist
           tags:
             - cinep-front
           variables:
             api: localhost/api
           script:
             - yarn install
             - node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod  OR yarn build
           only:
             refs:
               - master
         
         deploy cinep-front:
           stage: deploy
           tags:
             - cinep-front
           script:
             - mkdir -p ~/front-deployment
             - rm -rf ~/front-deployment/*
             - cp -r dist/cinep-front/. ~/front-deployment
           only:
             refs:
               - master

 3. Install node.js on server
    sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo npm install -g yarn
    
    
 4. Install certbot to make website secure(requires nginx)
      sudo apt-get update
      sudo apt-get install software-properties-common
      sudo add-apt-repository universe
      sudo add-apt-repository ppa:certbot/certbot
      sudo apt-get update
      
      sudo apt-get install certbot python-certbot-nginx
      
      sudo certbot --nginx
      
      Then follow instructions, like providing domain name if there is no domain name in configuration file
      
      Choose to redirect  HTTP traffic to HTTPS
      
      Check your website
    
    
    
