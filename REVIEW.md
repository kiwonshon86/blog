# Blog 코드 리뷰

## 잘 된 부분
- `src/lib/content.ts`에서 초안 글을 제외하고 최신순으로 정렬한 뒤 재사용 가능한 `allPosts`를 export하는 구조는 데이터 흐름을 이해하기 쉽게 만듭니다.
- `src/components/post-card.tsx`에서 카드 UI 컴포넌트를 재사용하고, 날짜와 태그를 명확히 표현하여 목록형 UI의 가독성을 높였습니다.
- `src/components/header.tsx`에 커맨드 팔레트를 통합하면 키보드 단축키(⌘/Ctrl + K)로 빠르게 페이지, 글, 태그로 이동할 수 있어 탐색 경험이 향상됩니다.

## 개선이 필요한 부분
- Next.js 15에서는 `searchParams`가 `Promise`로 전달되므로, 구버전과의 호환성을 고려해 Promise/객체 양쪽 모두를 처리하는 헬퍼를 두고 있습니다. 향후 `URLSearchParams` 기반의 타입 정의(`ReadonlyURLSearchParams` 등)를 명시하면 추후 리팩터링 시 안전성이 더 높아집니다.
- `src/app/page.tsx`의 페이지네이션은 현재 10개 고정이므로, 환경 변수나 상수로 분리해 재사용성을 높이거나, 쿼리 파라미터로 페이지 크기를 조절할 수 있는 여지를 남기면 확장성이 좋아집니다.
- `src/app/layout.tsx`의 `metadata`가 기본 값(`"Create Next App"`)으로 남아 있어 실제 블로그 정보에 맞춘 SEO 설정이 필요합니다.
- 모바일 내비게이션 `Sheet`는 기본적인 링크만 제공하므로, 검색이나 태그 요약 등 자주 쓰는 기능을 빠르게 노출하면 첫 화면에서 원하는 정보를 찾기 쉬울 것 같습니다.

## 참고 의견
- 태그 필터는 선택/해제 시 배지의 색상이 바뀌고 `aria-pressed`를 노출해 접근성까지 챙기고 있어 현 상태로도 충분히 명확합니다. 다만 태그 수가 많아지면 검색창이나 접기/펼치기 기능을 고려해보는 것도 좋겠습니다.
- 홈 화면 상단의 통계 출력은 QA 단계에서 유용할 수 있으므로 유지해도 괜찮지만, 배포 환경에서는 환경 변수를 이용해 토글하거나 개발 모드에서만 보이도록 분기하는 방식을 추천드립니다.
- `Geist` 폰트 import는 실제로 사용하고 있지 않으므로, 추후 타이포그래피를 정의할 때 제외하거나 필요한 폰트로 교체하는 것이 번들 크기 측면에서 이점이 있습니다.

## Velite 기반 정적 라우팅 관련 메모
- `src/app/posts/[slug]/page.tsx`는 라우트 세그먼트에 대해 `generateStaticParams`를 내보내지 않기 때문에, Next.js 15에서도 각 글이 완전히 정적으로 프리렌더링되지 않습니다. Velite가 이미 모든 포스트의 메타데이터를 제공하고 있으니 `allPosts.map(post => ({ slug: normSlug(post.slug) }))` 형태로 정적 파라미터를 생성하면 빌드 타임에 HTML을 확보하고 ISR 없이도 배포가 가능합니다. 【F:src/app/posts/[slug]/page.tsx†L1-L39】【F:src/lib/content.ts†L1-L20】
- 현재는 `normSlug` 유틸을 통해 런타임에서 `posts/` 접두사를 제거하고 있는데, Velite 스키마에서 `slug: s.path().transform(value => value.replace(/^posts\\//, ""))` 또는 `slug: s.slug()` 같은 전처리를 적용하면 `.velite` 결과물 자체가 라우트 파라미터와 동일해집니다. 이렇게 해두면 `getPostBySlug`가 별도의 정규화 없이 `Map` 조회만으로 동작하고, 정적 파라미터/메타데이터 생성 코드도 간결해집니다. 【F:src/lib/content.ts†L1-L20】【F:velite.config.ts†L1-L21】
- `getPostBySlug`가 매 요청마다 배열을 순회하고 있어, `generateMetadata`·`generateStaticParams` 등 여러 훅에서 같은 lookup이 반복되면 비용이 누적될 수 있습니다. Velite 출력물을 이용해 모듈 레벨에서 `new Map(allPosts.map(post => [post.slug, post]))`을 만들어두면 라우팅, 메타데이터, TOC 등에서 O(1) 조회가 가능해져 정적 라우팅 구성이 더 깔끔해집니다. 【F:src/lib/content.ts†L1-L20】
