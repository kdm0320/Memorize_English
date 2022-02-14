# 영어단어 암기 API Project

## Description

1. 단어 암기를 도와주는 웹사이트입니다.  
   단어 세트를 골라 그 안에 있는 단어들을 공부할 수 있으며  
   단어와 뜻을 가리는 기능을 이용해 암기에 도움을 주고  
   외운 단어 체크 및 자신의 성취도를 확인 할 수 있습니다.

2. 프론트와 백엔드를 분리했으며 백엔드는 DRF를 이용해 RESTful하게 구성했습니다.

---

## URL

- ### 프로젝트 URL : https://memovoca.shop
- ### Frontend : https://github.com/kdm0320/Memorize_English_Frontend.git
- ### Backend: https://github.com/kdm0320/Memorize_English_Backend.git

---

## Used Language & Libraries

- ### Frontend
  - TypeScript
  - React
  - CSS - styled-components / framer-motion
- ### Backend
  - Python
  - Django
  - Django Rest Framework
- ### Deploy
  - Frontend
    - netlify
  - Backend
    - Heroku

---

## Content - 주요 페이지 기능

- ### 단어모음
  - 단어모음에 있는 단어를 선택 / 유저 학습관리로 저장
  * 현재 유저 컬렉션에 있는 단어 세트는 하트표시 아닐 경우 빈 하트
  * 하트를 누를시 유저 컬렉션에서 사라지고 빈 하트표시로 변함
- ### 학습관리
  - 단어모음에서 하트를 누른 단어세트들이 표시
  - 세트를 누를시 안의 내용들과 성취도를 볼 수 있는 페이지로 연결
  - 페이지에서 단어와 뜻을 가릴 수 있으며 한페이지에 10개씩 단어들을 볼 수 있음
  - 다 외운 단어 체크표시 가능
  - 성취도 보기를 클릭시 총 단어 대비 외운 단어의 수가 그래프로 나타난다
  - 뒤로 표시된 화살표를 통해서만 페이지를 나가는 것이 가능
  - 단어 세트 삭제 가능 => 이 경우 모든 데이터 삭제
- ### QnA
  - DRF를 통해 CRUD 구현
  - 게시물 제목을 클릭했을때 작성자 본인일 경우에만 삭제 및 수정버튼이 드러남
- ### 세부설명
  - https://github.com/kdm0320/Memorize_English_Frontend.git

## Reference

- ### 토익 빈출영어단어 327
  https://bonlivre.tistory.com/75
- ### 기본 영어단어 1000개
  https://m.blog.naver.com/cu1023/221296679654
