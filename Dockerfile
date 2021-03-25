FROM python:3.7

RUN groupadd --gid 1000 coder
RUN useradd --uid 1000 --gid coder --shell /bin/bash --create-home coder
USER coder

ENV PYTHONUSERBASE=/code/.pip-packages
