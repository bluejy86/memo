# 민감 파일 보호 규칙

다음 파일은 읽거나 내용을 출력하거나 요약하지 않는다. 사용자가 요청해도 먼저 이 규칙을 안내하고, 규칙을 우회하지 않는다.

- `.env`, `.env.*`
- 이름에 `credential` 또는 `secret`이 들어간 파일
- `*.pem`, `*.key`, `id_rsa*`, `id_ed25519*`

Read 도구뿐 아니라 `cat`, `type`, `Get-Content`, `grep` 등 셸 명령으로 읽는 것도 금지한다.
Read 도구가 deny 규칙으로 막히면 다른 방법으로 같은 파일을 읽으려 하지 않는다.
이 파일들의 값은 코드, 로그, 커밋, 응답에 옮겨 적지 않는다.

# 디자인 토큰

## 색 (Colors)

| 이름 | 값 |
|---|---|
| color/primary | #3182f6 |
| surface/page | #f2f4f6 |
| surface/card | #ffffff |
| text/primary | #191f28 |
| text/secondary | #4e5968 |
| text/muted | #8b95a1 |
| text/on-primary | #ffffff |
| border/default | #e5e8eb |
| label/blue | #3182f6 |
| label/blue-soft | #e8f3ff |
| label/green | #12a150 |
| label/green-soft | #e3f8ec |
| label/orange | #f76808 |
| label/orange-soft | #fff1e5 |
| label/pink | #e5397a |
| label/pink-soft | #ffeaf1 |

## 간격 (Spacing)

| 이름 | 값 |
|---|---|
| space/4 | 4 |
| space/8 | 8 |
| space/12 | 12 |
| space/16 | 16 |
| space/20 | 20 |
| space/24 | 24 |
| space/34 | 34 |
| space/48 | 48 |
| space/64 | 64 |

## 모서리 (Radius)

| 이름 | 값 |
|---|---|
| radius/sm | 12 |
| radius/md | 16 |
| radius/lg | 20 |
| radius/xl | 24 |
| radius/full | 999 |

## 텍스트 스타일 (Noto Sans KR)

| 이름 | 굵기 | 크기 | 행간 | 자간 |
|---|---|---|---|---|
| heading/xl | Bold | 28 | 38 | -0.8 |
| heading/lg | Bold | 26 | 36 | -0.8 |
| title/lg | Bold | 20 | 28 | -0.4 |
| title/md | Bold | 17 | 24 | -0.3 |
| label/md | Bold | 15 | 22 | -0.2 |
| body/md | Regular | 16 | 28 | -0.2 |
| body/sm | Regular | 14 | 20 | -0.1 |
| caption/md | Medium | 15 | 22 | -0.2 |
| caption/sm | Medium | 13 | 18 | 0 |
| button/md | Bold | 17 | 24 | -0.2 |

## 디자인 규칙
- 디자인 토큰에 없는 값은 쓰지 않는다. 필요하면 먼저 물어본다
- 같은 모양의 UI는 기존 컴포넌트를 재사용한다
- 한글은 Noto Sans KR로 쓰고, 단어 중간에서 줄을 바꾸지 않는다
- 코드에서는 디자인 토큰 이름만 쓰고, 아이콘 색은 글자색을 따른다


@AGENTS.md
