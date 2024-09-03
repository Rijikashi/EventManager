FROM ruby:3.2.0

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y nodejs


RUN mkdir /app
WORKDIR /app

COPY . .
RUN gem install bundler
RUN bundle install
RUN bundle update

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
