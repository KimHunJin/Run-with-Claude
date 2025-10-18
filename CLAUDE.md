# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 프로젝트 개요

Rolldown-Vite(실험적인 Vite 포크 + Rolldown 번들러)를 사용하는 React + TypeScript + Vite 애플리케이션입니다.
프로젝트는 Feature-Sliced Design(FSD) 아키텍처 패턴을 따르며, 확장 가능하고 유지보수하기 쉬운 프론트엔드 구조를 제공합니다.
러닝 훈련을 위한 데이터를 제공하는 목적으로 만들어졌습니다.
웹 페이지로 개발되며, 모바일 및 데스크탑 환경 모두에서 반응형으로 작동합니다.

### 페이지 구조

#### 홈 페이지
2개의 탭으로 구성된 러닝 페이스 가이드를 제공합니다:

1. **목표 페이스 계산 탭** (기본 탭)
   - **페이스 직접 입력 모드**: 분:초 형식으로 목표 페이스 입력
   - **거리/시간 입력 모드**: 특정 거리와 시간으로 페이스 자동 계산
     - 거리 프리셋 버튼: 400m, 1km, 5km, 10km, 20km, 하프(21.0975km), 풀(42.195km)
     - 시:분:초 형식 지원
   - 8가지 거리별 예상 완주 시간 표시 (100m, 400m, 1km, 5km, 10km, 20km, 하프, 풀)
   - 시간 표시: HH:MM:SS 또는 MM:SS 형식(메인) + 초 단위(서브)
   - 로컬 스토리지를 통한 입력값 자동 저장 및 복원
   - 페이지 진입 시 저장된 값 또는 기본값으로 자동 계산

2. **상세 페이스 표 탭**
   - 3'00" ~ 7'00" 범위의 페이스를 5초 단위로 표시
   - 100m ~ 1000m (100m 단위) 거리별 소요 시간 표시
   - 시간 형식: 초 단위(메인) + 분:초 형식(서브)
   - 고정 헤더 및 첫 번째 열로 스크롤 편의성 제공

#### 훈련 일지 (계획됨)
진행했던 러닝 훈련을 기록하고 관리할 수 있는 기능을 제공합니다.


## 저장소 및 배포

### Git 저장소
- **GitHub**: https://github.com/KimHunJin/Run-with-Claude.git
- 초기 커밋 완료 (43개 파일, 5,309줄)
- 모든 변경사항은 자동으로 원격 저장소에 푸시됨

### 배포 환경
- **Vercel**: 자동 배포 설정 완료
- GitHub에 push 시 자동으로 재배포됨
- `vercel.json` 설정 파일로 빌드 구성 관리
- 프로덕션 빌드 명령: `npm run build`
- 출력 디렉토리: `dist/`

## 개발 명령어

- `npm run dev` - HMR이 포함된 개발 서버 시작
- `npm run build` - TypeScript 컴파일(`tsc -b`) 후 Vite 빌드 실행
- `npm run lint` - 모든 파일에 대해 ESLint 실행
- `npm run preview` - 프로덕션 빌드를 로컬에서 미리보기

## 기술 스택

- **React**: v19.1.1 (최신)
- **TypeScript**: v5.9.3
- **빌드 도구**: Rolldown-Vite 7.1.14 (Rolldown 번들러를 사용하는 실험적인 Vite 포크)
- **린팅**: TypeScript 지원, React Hooks 규칙, React Refresh 플러그인이 포함된 ESLint v9

## 아키텍처 패턴: Feature-Sliced Design (FSD)

이 프로젝트는 FSD 아키텍처 패턴을 따릅니다. FSD는 비즈니스 로직과 기술적 관심사를 명확하게 분리하는 확장 가능한 프론트엔드 아키텍처입니다.

### FSD 레이어 구조

```
src/
  app/              - 애플리케이션 초기화 레이어
    App.tsx         - 메인 앱 컴포넌트

  pages/            - 페이지 레이어
    home/           - 홈 페이지 (탭 UI로 구성)

  features/         - 기능 레이어
    pace-calculator/           - 상세 페이스 표 기능
      ui/           - PaceCard, PaceDetailTable 컴포넌트
      model/        - pace-levels (훈련 강도별 페이스 데이터)

    goal-pace-calculator/      - 목표 페이스 계산기 기능
      ui/           - PaceInput, GoalPaceCard 컴포넌트
      model/        - distances (거리 프리셋)

  shared/           - 공유 레이어
    ui/             - Modal, Tabs 등 재사용 가능한 UI 컴포넌트
    lib/            - pace-calculator (페이스 계산 유틸리티), storage (로컬 스토리지)
    types/          - pace (페이스 관련 타입 정의)
```

### FSD 슬라이스 내부 구조

각 슬라이스(feature, entity, widget)는 다음과 같은 세그먼트로 구성됩니다:

```
feature/feature-name/
  ui/               - UI 컴포넌트
  model/            - 비즈니스 로직 (store, hooks, types)
  api/              - API 요청
  lib/              - 헬퍼 함수
  config/           - 설정 및 상수
  index.ts          - 공개 API (Public API)
```

### FSD 핵심 규칙

1. **레이어 간 의존성**: 상위 레이어는 하위 레이어만 import 가능 (app → pages → widgets → features → entities → shared)
2. **슬라이스 격리**: 같은 레이어의 슬라이스끼리는 직접 import 불가
3. **Public API**: 각 슬라이스는 `index.ts`를 통해서만 외부에 노출
4. **비즈니스 로직 분리**: UI와 비즈니스 로직은 명확히 분리 (ui/ vs model/)

### 새로운 기능 추가 시

1. 어떤 레이어에 속하는지 결정 (feature vs entity vs widget)
2. 해당 레이어에 새 슬라이스 생성
3. 필요한 세그먼트(ui, model, api 등) 추가
4. `index.ts`에서 공개할 API만 export
5. 상위 레이어에서 슬라이스 조합

## 구현된 주요 기능

### 페이스 계산 유틸리티 (`shared/lib/pace-calculator.ts`)
- `formatTime(seconds)`: 초를 MM:SS 형식으로 변환
- `formatTimeHMS(seconds)`: 초를 HH:MM:SS 또는 MM:SS 형식으로 변환
- `formatSeconds(seconds)`: 초를 소수점 1자리 문자열로 변환
- `calculateTimeForDistance(pacePerKm, distanceInMeters)`: 페이스와 거리로 소요 시간 계산
- `calculatePaceFromDistanceAndTime(distanceKm, timeSeconds)`: 거리와 시간으로 페이스 역산
- `paceToSpeed(pacePerKm)`: 페이스를 속도(km/h)로 변환
- `speedToPace(speedKmh)`: 속도를 페이스로 변환

### 로컬 스토리지 관리 (`shared/lib/storage.ts`)
- `getLocalStorage<T>(key, defaultValue)`: 로컬 스토리지에서 값 불러오기 (타입 안전)
- `setLocalStorage<T>(key, value)`: 로컬 스토리지에 값 저장하기 (JSON 직렬화)
- 사용자 입력값 자동 저장 및 복원 기능 제공

### UI 컴포넌트 (`shared/ui/`)
- **Tabs**: 재사용 가능한 탭 인터페이스
  - 키보드 접근성 지원
  - 부드러운 전환 애니메이션
  - 반응형 디자인
- **Modal**: 팝업 모달 컴포넌트
  - ESC 키 또는 오버레이 클릭으로 닫기
  - 스크롤 잠금 처리
  - 페이드인/슬라이드업 애니메이션

### 목표 페이스 카드 (`features/goal-pace-calculator/ui/GoalPaceCard`)
- 8가지 거리별 예상 완주 시간 카드 표시
- 텍스트 오버플로우 처리 (`overflow: hidden`, `text-overflow: ellipsis`)
  - 긴 시간 값이 카드 레이아웃을 벗어나지 않도록 방지
  - 말줄임표(...) 표시로 UI 일관성 유지
- 반응형 그리드 레이아웃
- 호버 효과 및 부드러운 전환 애니메이션

### 타입 정의 (`shared/types/pace.ts`)
- `PaceData`: 페이스 관련 기본 데이터 구조
- `PaceLevel`: 훈련 강도 레벨 ('easy' | 'moderate' | 'tempo' | 'threshold' | 'interval' | 'sprint')
- `PaceLevelData`: 훈련 강도별 상세 페이스 데이터

## 주요 설정 파일

- `vite.config.ts` - React 플러그인이 포함된 Vite 설정
- `vercel.json` - Vercel 배포 설정 (빌드 명령, 출력 디렉토리, 프레임워크 설정)
- `eslint.config.js` - TypeScript, React Hooks, React Refresh 규칙이 포함된 ESLint v9 flat config
- `tsconfig.json` - app 및 node 설정을 참조하는 복합 TypeScript 설정
- `tsconfig.app.json` - 애플리케이션 코드를 위한 TypeScript 설정
- `tsconfig.node.json` - Vite 설정 파일을 위한 TypeScript 설정

## 중요 사항

- 이 프로젝트는 표준 Vite 대신 **Rolldown-Vite**(npm override)를 사용합니다 - Rollup 생태계와 더 호환되는 실험적 번들러
- ESLint는 새로운 v9 flat config 형식(`defineConfig`, `globalIgnores`)을 사용합니다
- React 19를 사용하며, React 18과 호환되지 않는 변경사항이 포함되어 있습니다
- 진입점에서 non-null assertion(`document.getElementById('root')!`)을 사용합니다 - `index.html`에 root 엘리먼트가 반드시 존재해야 합니다
- **로컬 스토리지 사용**: 사용자 입력값(페이스, 거리, 시간)을 자동으로 저장하고 복원합니다
  - 페이지 새로고침 시에도 입력값 유지
  - 기본값: 페이스 직접 입력 6:00/km, 거리/시간 입력 10km 1:00:00
