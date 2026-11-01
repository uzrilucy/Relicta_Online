# 렐릭타 온라인 공식 홈페이지

풀다이브 VRMMORPG 시뮬레이션 봇 《렐릭타 온라인》의 설정집입니다.
게임 서비스 공식 홈페이지 형식으로 만들었습니다.

빌드 과정이 없는 정적 사이트입니다. 이 폴더를 그대로 GitHub Pages에 올리면 됩니다.

## 폴더 구조

```
index.html            페이지 본문
assets/css/style.css  디자인
assets/js/data.js     공개 데이터(인물 162명, 길드, 소속)
assets/js/sealed.js   봉인 문서(스포일러)를 인코딩한 꾸러미
assets/js/app.js      동작 스크립트(필터, 모달, 지도, 랭킹, 봉인 해제)
img/                  인물 이미지 (cXXX_h 얼굴 / cXXX_f 전신 / cXXXa 변신 모습)
emblem/               길드 엠블럼 12종 (SVG)
promo/                로고, 커버, 스틸컷, PV 영상
div/                  섹션 구분선 (SVG)
.nojekyll             GitHub Pages가 Jekyll 변환을 하지 않도록 하는 빈 파일
```

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다. 예: `relicta-online`
   - 무료 계정에서는 저장소를 **Public**으로 만들어야 Pages가 켜집니다.
2. 이 폴더의 내용을 저장소 맨 위에 올립니다.
   - `index.html`이 저장소 최상단에 있어야 합니다.
   - 파일이 370개가 넘습니다. 웹 업로드는 한 번에 100개까지만 됩니다.
   - **GitHub Desktop**으로 올리면 한 번에 끝납니다.
     - 저장소를 Clone합니다.
     - 이 폴더 내용을 Clone한 폴더에 붙여 넣습니다.
     - Commit → Push 합니다.
   - 웹 업로드만 쓴다면 아래처럼 나눠 올립니다.
     - ① `img` 외 전부
     - ② `img` 절반씩 두세 번
   - 숨김 파일(`.nojekyll`, `.gitattributes`)은 빠지기 쉬우니 함께 올라갔는지 확인하세요.
3. 저장소의 **Settings → Pages**로 갑니다.
   - **Source**를 `Deploy from a branch`로 둡니다.
   - Branch를 `main`, 폴더를 `/ (root)`로 고르고 Save를 누릅니다.
4. 1~2분 뒤 `https://<아이디>.github.io/<저장소명>/`에서 열립니다.

### 배포 후 하면 좋은 것

`index.html`의 공유 카드 이미지는 지금 상대 경로입니다.
디스코드나 트위터 미리보기에 이미지가 뜨게 하려면 전체 주소로 바꾸세요.

```html
<meta property="og:image" content="https://<아이디>.github.io/<저장소명>/promo/cover-logo-a.jpg">
```

## 봉인 문서에 대해

봉인 문서와 히든 인물 3명의 데이터는 `assets/js/sealed.js`에 인코딩되어 있습니다.
**봉인 해제** 버튼을 눌러야 페이지에 나타납니다.
페이지 소스를 열어 봐도 스포일러가 바로 보이지 않게 하려는 장치입니다. 보안 잠금은 아닙니다.

봉인 문서나 인물 데이터를 고친 뒤에는 원본 소스 꾸러미(`relicta-site-source`)의 `pack.py`로 다시 만들어야 합니다. 원본 꾸러미에는 스포일러가 평문으로 들어 있으니 **저장소에 올리지 마세요.**

## 수정 팁

- 모든 텍스트 파일은 **UTF-8(BOM 없음)**입니다.
  - 메모장이나 VS Code에서 저장할 때 인코딩이 바뀌지 않게 주의하세요.
  - `.editorconfig`와 `.gitattributes`가 대부분의 편집기와 Git에서 이를 지켜 줍니다.
- 인물 이미지를 바꿀 때는 같은 파일명으로 덮어쓰면 됩니다.
  - `_h`: 얼굴, 정사각 320px
  - `_f`: 전신, 투명 배경, 세로 560px
- 외부 리소스는 Google Fonts뿐입니다. 나머지는 전부 이 폴더 안에 있습니다.

---

© RELICTA ONLINE · 이 사이트에 나오는 세계, 회사, 인물은 모두 가상입니다.
