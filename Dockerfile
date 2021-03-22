FROM nginx:alpine

COPY dist /opt/ng-login-ui
COPY config/nginx.conf /etc/nginx/

WORKDIR /opt/ng-login-ui

# for on-prem
RUN addgroup -S 101 && adduser -S 101 -G 101
RUN chown -R 101:101 /opt/ /tmp
RUN chmod 700 -R /opt
RUN chmod 700 -R /tmp
USER 101
# end on-prem

RUN ls -lh

EXPOSE 8080

CMD nginx -c /etc/nginx/nginx.conf -g 'daemon off;'
