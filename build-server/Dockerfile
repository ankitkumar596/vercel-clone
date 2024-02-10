FROM ubuntu:focal

RUN apt-get update 
RUN apt-get install -y curl 

RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - 
RUN apt-get upgrade -y 
RUN apt-get install -y nodejs 

RUN apt-get install -y git

WORKDIR /home/app 

COPY main.sh main.sh

ENTRYPOINT [ "/home/app/main.sh" ]

