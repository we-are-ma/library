# ImageSelect jQuery Plugin

ImageSelectは、見た目の良いドロップダウンを使用してユーザーが画像を選択できるjQueryプラグインです。

`<select>`を持っている必要があり、その中には1つ以上の`<option>`が含まれている必要があります。

各オプションには、表示したい画像のURLをオプションテキストとして含める必要があります。オプションの値は任意のものにできます。

例：

```html
<select name="logo"> 
<option value="1">/images/whatever.jpg</option>
<option value="2">/images/something.png</option>
<option value="3">/images/misc.gif</option> 
</select>
```

次に、javascript、スタイルシート、画像を含め、画像のパスが正しいことを確認するためにcssを変更するだけです。

```html
<script src="/imageselect/imageselect.js" type="text/javascript"></script>
<link href="/imageselect/imageselect.css" media="screen" rel="stylesheet" type="text/css" />
```

最後に、jQueryでラップされたselect要素で`.ImageSelect`を呼び出すだけです：

```javascript
$('select[name=logo]').ImageSelect();
```

詳細な統合については、以下を参照してください。

### 使用法：

jQueryでラップされた`<select>`要素で`ImageSelect`を呼び出す必要があります：

```javascript
$('select[name=logo]').ImageSelect();
```

オプションをオブジェクトとして渡すことができます：

```javascript
$('select[name=logo]').ImageSelect({width:100});
```

または、使用するメソッドを指定します：

```javascript
$('select[name=logo]').ImageSelect('remove');
```

または、両方：

```javascript
$('select[name=logo]').ImageSelect('init',{width:100,height:50});
```

### 引数：

- **method** – 呼び出すメソッド。省略された場合、デフォルトで「init」メソッドが呼び出されます。
- **options** – さまざまなオプションを含むオブジェクトです（以下参照）。

### 方法：

- **init** – 選択された要素を使用してプラグインを初期化します。
- **open** – 要素のドロップダウン部分を表示します（既に表示されている場合はアニメーションを介して非表示にします）。
- **close** – 要素のドロップダウン部分を非表示にします（アニメーションなし）。
- **remove** – コントロールを削除し、元の選択入力に戻します。
- **update** – 表示される画像の選択を更新します。URLをオブジェクトで指定する必要があります。

### オプション：

- **width** – selectの幅。デフォルトは200。
- **height** – selectの高さ（ドロップダウンが非表示の場合）。デフォルトは75。
- **dropdownWidth** – selectのドロップダウンリスト部分の幅。デフォルトは350。
- **dropdownHeight** – selectのドロップダウンリスト部分の高さ（オーバーフローはスクロールします）。デフォルトは250。
- **z** – ドロップダウンに使用するz-index。デフォルトは99999。
- **backgroundColor** – コントロールの背景色。デフォルトは「#ffffff」。
- **borderColor** – コントロールの境界色（ドロップダウンを含む）。デフォルトは「#cccccc」。
- **lock** – ロックする次元、幅または高さ。デフォルトは「height」。

記事のソース：[http://www.liam-galvin.co.uk/imageselect/](http://www.liam-galvin.co.uk/imageselect/)

## Demo

[https://blue-islands.github.io/imageselect/](https://blue-islands.github.io/imageselect/)
