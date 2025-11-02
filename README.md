# Blog

Next.js 15, React 19, Tailwind CSS 4로 구축된 개인 블로그 템플릿입니다. Velite 컬렉션을 활용해 `src/posts`의 MDX 문서를 정적 데이터로 변환하고, 태그 필터와 목차, RSS/사이트맵 같은 블로그 필수 기능을 제공합니다.

## 주요 기능
- **MDX 기반 글쓰기**: Velite가 `src/posts/*.mdx` 파일을 파싱해 `.velite` 모듈을 생성합니다. 프론트매터에서 `title`, `description`, `date`, `tags`, `draft` 등을 선언하면 `allPosts` 컬렉션에서 바로 사용할 수 있습니다.
- **태그 필터링 목록 페이지**: 홈 화면은 선택한 태그 집합과 페이지네이션에 따라 글을 필터링해 보여주며, 각 글은 카드 형태로 표시됩니다.
- **MDX 상세 페이지 & 목차**: 글 페이지는 런타임에 MDX 코드를 컴파일해 렌더링하고, 문서 내 `h2` 헤딩을 기반으로 한 클라이언트 사이드 목차를 제공합니다.
- **피드 & SEO 지원**: RSS 피드(`/api/rss`)와 사이트맵(`/sitemap`)을 제공하며, 구조화된 데이터 출력을 위한 헬퍼도 포함되어 있습니다.
- **UI 구성 요소**: shadcn/ui 기반 네비게이션 헤더, 배지, 카드 등을 포함하고 Tailwind CSS 4 테마 토큰을 커스터마이즈했습니다.

## 폴더 구조
```
.
├─ src
│  ├─ app
│  │  ├─ page.tsx             # 태그 필터가 적용된 포스트 목록
│  │  ├─ posts/[slug]/page.tsx # MDX 상세 페이지
│  │  ├─ api/rss/route.ts     # RSS 피드
│  │  └─ sitemap/route.ts     # 사이트맵
│  ├─ components              # UI 및 MDX 컴포넌트
│  ├─ lib                     # 콘텐츠, SEO 유틸리티
│  └─ posts                   # 작성한 MDX 글 모음
├─ velite.config.ts           # Velite 컬렉션 정의
└─ .velite/                   # Velite가 생성한 정적 데이터
```

## 빠른 시작
1. 의존성 설치
   ```bash
   bun install
   ```
2. 개발 서버 실행 (Next.js 15 + Turbopack)
   ```bash
   bun run dev
   ```
   브라우저에서 http://localhost:3000 으로 접속합니다.
3. 프로덕션 빌드 & 실행
   ```bash
   bun run build
   bun run start
   ```

## 콘텐츠 작성 워크플로
1. `src/posts`에 새로운 `*.mdx` 파일을 생성합니다.
2. 다음과 같은 프론트매터를 추가해 메타데이터를 정의합니다.
   ```mdx
   ---
   title: "글 제목"
   description: "요약"
   date: 2025-01-01
   tags: [Next.js, MDX]
   draft: false
   ---
   ```
3. MDX 본문을 작성합니다. 필요하다면 `img`, `h2` 등 커스텀 컴포넌트가 적용됩니다.
4. 저장 후 `bunx velite`를 실행해 `.velite` 데이터를 갱신합니다. 개발 서버가 실행 중이라면 변경 사항이 즉시 반영됩니다.

## 품질 관리 스크립트
- 코드 스타일 및 린트 검사: `bun run lint` (Biome)
- 자동 포맷팅: `bun run format`

## 환경 변수
- `NEXT_PUBLIC_SITE_URL`: RSS, 사이트맵, 구조화 데이터에서 사용하는 기본 도메인. 설정하지 않으면 `http://localhost:3000`을 기본값으로 사용합니다.
- Giscus 댓글(선택):
  - `NEXT_PUBLIC_GISCUS_REPO`: `owner/repo` 형식의 깃허브 저장소 경로.
  - `NEXT_PUBLIC_GISCUS_REPO_ID`: Giscus 설치 시 발급되는 저장소 ID.
  - `NEXT_PUBLIC_GISCUS_CATEGORY`: 사용할 Discussions 카테고리 이름.
  - `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Discussions 카테고리 ID.
  - 필요 시 `NEXT_PUBLIC_GISCUS_THEME`, `NEXT_PUBLIC_GISCUS_LANG` 등 [Giscus 환경 변수](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#environment-variables)도 덮어쓸 수 있습니다. 필수 값이 비어 있으면 댓글 영역은 렌더링되지 않습니다.

## 배포
빌드 아티팩트는 Next.js 표준 방식과 동일합니다. 정적 콘텐츠는 Velite가 빌드 시점에 생성하므로, 배포 전에 `bunx velite && bun run build` 순으로 실행해 최신 콘텐츠를 포함시켜 주세요.
