# 1. 빌드 환경 설정
FROM node:22-slim AS build

# pnpm 설정
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 애플리케이션 파일 복사
WORKDIR /app
COPY . .

# 빌드 인자 정의
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_WEB_DOMAIN
ARG REACT_APP_KAKAO_SHARE_DOMAIN
ARG REACT_APP_KAKAO_SDK_KEY
ARG REACT_APP_KAKAO_TEMPLATE_ID
ARG REACT_APP_IMAGE_FILE_LIMITATION
ARG REACT_APP_API_URL

# 환경 변수 설정
ENV REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN
ENV REACT_APP_WEB_DOMAIN=$REACT_APP_WEB_DOMAIN
ENV REACT_APP_KAKAO_SHARE_DOMAIN=$REACT_APP_KAKAO_SHARE_DOMAIN
ENV REACT_APP_KAKAO_SDK_KEY=$REACT_APP_KAKAO_SDK_KEY
ENV REACT_APP_KAKAO_TEMPLATE_ID=$REACT_APP_KAKAO_TEMPLATE_ID
ENV REACT_APP_IMAGE_FILE_LIMITATION=$REACT_APP_IMAGE_FILE_LIMITATION
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# 프로덕션 종속성 설치 및 애플리케이션 빌드
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 2. Nginx를 사용하여 정적 파일 서빙
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 빌드된 파일만 복사하여 컨테이너에 포함
COPY --from=build /app/build /usr/share/nginx/html

# 포트 노출
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
