FROM ubuntu:latest

ADD . /service

WORKDIR /service

# Update the package list
RUN apt-get update

# Install CMake
RUN apt-get install -y cmake
RUN apt-get install -y git
RUN apt-get install -y g++


RUN git clone https://github.com/oatpp/oatpp.git
WORKDIR /service/oatpp
ADD . /build
WORKDIR /service/oatpp/build
RUN cmake ..
RUN make install

WORKDIR /service/utility

RUN ./install-oatpp-modules.sh


WORKDIR /service/build

RUN cmake ..
RUN make

EXPOSE 8000 8000

RUN chmod +x my-project-exe
ENTRYPOINT ["sh", "-c", "./my-project-exe"]

