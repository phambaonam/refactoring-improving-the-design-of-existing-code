# Những nguyên tắc Refactoring.

Ở cái chapter này thì cũng không xôi thịt như ở cái chapter trước, rất nhiều chữ mà không có lấy 1 đoạn code nào cả. Chater này sẽ sử dụng gần như nguyên văn của Tác giả.

## Đầu tiên hãy định nghĩa khái niệm Refactor.

Từ `refactoring` cũng có thể sử dụng 1 danh từ (noun) hoặc như 1 động từ (verb):
* Refactoring (noun): Thay đổi cấu trúc bên trong của phần mềm để nó trở nên dễ dàng trong việc tìm hiểu và phí duy trì rẻ hơn mà không làm thay đổi mục đích của phần mềm đó được tạo ra.

Định nghĩa này tương ứng với những cái tên mà tôi đã nói đến trong những ví dụ ở chapter trước như: `Extract Function (106)` và `Replace Conditional with Polymorphism (272)`.

* Refactoring (verb): Thay đổi cấu trúc(Tái cấu trúc - restructure) của phần mềm bằng cách áp dụng các kỹ thuật refactorings mà không làm thay đổi mục đích của phần mềm đó được tạo ra.

Vì thế, tôi có thể dành hàng giờ đồng hồ vào việc refactoring với việc áp dụng vài chục kỹ thuật refactoring.

Trong những năm qua, các lập trình viên đã sử dụng các kỹ thuật 'refactoring' để làm code của họ trở lên clean hơn -  những cách định nghĩa trên đã chỉ ra lý do họ refactor code (đại ý là vầy).
Công việc refactoring chính là không được phép làm thay đổi mục đích được tạo của từng thành phần nhỏ, ta có thể sửa đổi tổ chức bên trong 1 thành phần đó nhưng không được phép thay đổi mục đích của nó được tạo ra. Việc kết hợp các thành phần nhỏ khác với nhau sẽ tạo ra 1 thay đổi rất lớn(Thay đổi như nào thì định nghĩa cũng nói lên rồi - đại ý là vầy).

Mỗi thành phần nhỏ refactor cũng có thể phụ thuộc vào việc kết hợp các thành phần nhỏ khác lại hoặc là không , tức là chỉ thay đổi bên trong chính thành đó thôi(Bạn hiểu hôn)

Như cách tôi làm, trong khi refactor, tôi không phải dành quá nhiều thời gian vào để sửa 1 bước nào đang sai, tôi hoàn toàn có thể dừng lại bất kỳ lúc nào nếu bước trước đó không đúng(đại ý là vầy)
Tôi sử dụng từ 'restructuring' như 1 thuật ngữ chung ám chỉ cho việc tổ chức lại (reorganizing) hay dọn dẹp bất kỳ 1 đoạn code nào đó, và tôi coi việc refactor như 1 loại tái cấu trúc đặc biệt.
Người ta sẽ dường như cảm thấy không mấy có hiệu quả khi lần đầu thấy cách tôi làm là thực hiện nhiều bước nhỏ, vì họ cho rằng thực hiện 1 bước đơn giản, lớn hơn của tôi sẽ tốt hơn.
Nhưng những bước nhỏ đó cho phép tôi đi nhanh hơn, bởi vì chúng giúp tôi kiểm soát tốt hơn những thay đổi của mình tạo ra(đại ý là vầy), tôi không mất thời gian vào việc debug

Trong những cách định nghĩa của tôi, tôi sử dụng cụm từ `observable behavior` - `quan sát hành vi`. Quan sát hành vi là những hành động được thực hiện bới 1 đối tượng nào đó, những cái mà ta có thể nhìn thấy và đo đạc được. Nếu trong code thì nó có nghĩa như thế nào, đó chính là kết quả thực hiện của đoạn code, ví dụ như 1 hàm nào đó thực hiện nhiệm vụ gì, dữ liệu nó trả về thuộc kiểu data type nào, vv..., mục đích chính là không làm thay đổi kết quả trước đó của đoạn code, mặc cho ta sửa đổi như thế nào. Việc sửa đổi không làm thay đổi kết quả, tuy nhiên, nó cũng ảnh hưởng tới 1 số điều khác, ví dụ khi bạn sử dụng `Extract Function` thì sẽ tác động tới call stack, vì vậy performance có thể thay đổi. Nhất là sử dụng kỹ thuật `Change Function Declaration` và `Move Function` để refactor, thường sẽ làm thay đổi từ lớp interface cho tới toàn module. Bất kỳ bugs nào mà tôi thấy dc khoảng thời gian refactor thì `có thể` vẫn còn sau khi refactor, vì thực tế vẫn có có những bugs tiềm ẩn (bugs ngầm).

Công việc Refactor gần giống việc tối ưu performance, cả 2 đều là sửa code mà không làm thay đổi các chức năng được thiết kế bạn đầu của phần mềm. Điều khác nhau chính là mục đích: Việc Refactor luôn làm cho code "dễ dàng trong việc đọc hiểu và chí phí bảo trì rẻ hơn". Nó có thể làm cho ứng dụng chạy nhanh hơn 1 chút hoặc chậm đi 1 tẹo. Còn với tối ưu hiệu suất ứng dụng thì chỉ quan tâm vào tốc độ của chương trình, tôi sẵn sàng làm việc với những đoạn code mà gây khó khăn trong việc hiểu nhưng lại giải quyết được về vấn đề hiểu suất.

## Tại sao lại Refactor code.

### Refactor cải thiện thiết kế của phần mềm.
Nếu không có Refactoring thì kiến trúc thiết kế bên trong của phần mềm sẽ trở lên rối rắm, bởi vì chúng ta thay đổi code chỉ để hoàn thành 1 múc tiêu ngắn hạn như muốn cho phần mềm chạy được cho buổi realease, vv.. mà không quan tâm sau này, với sự không hiểu biết về kiến trúc, code trở lên lộn xộn. Điều đó sẽ làm cho tôi cảm thấy khó khăn khi muốn xem thiết kế bằng việc đọc code. Sự mất tổ chức (code lộn xộn) của code gây ra nhiều tác động như khó khăn trong việc xem thiết kế trong code, trong việc bảo trì và rồi càng ngày sẽ trở thành đống hổ lốn. Với Refactoring làm cho code ngăn lắp, gọn gàng hơn.

Thiết kế code tệ thường tạo ra những dòng code làm 1 công việc lặp lại giống nhau, ý ở đây là viết nhiều đoạn code giống nhau lặp lại nhiều lần, bởi vì thường thì cũng có những hành động lặp lại ở nhiều chỗ. Do vậy, 1 điều quan trọng của việc cải thiện thiết kế là loại bỏ những đoạn code giống nhau lặp lại. Việc giảm được vài dòng code không đồng nghĩa sẽ làm chương trình chạy nhanh hơn nhưng nó tạo ra 1 sự khác biệt lớn khi phải sửa đổi code, tưởng tượng rằng bạn có 1 đoạn code nhưng cần dùng ở 10 nơi, khi cần sửa thì bạn cũng phải sửa ở 10 nơi, sẽ rất mất thời gian, chẳng may bạn quên 1 chỗ nào đó chưa sửa theo thì chương trình sẽ không còn chạy đúng nữa (dịch đại ý là vầy).

### Refactoring làm cho chương trình dễ hiểu hơn.
Chúng ta muốn máy tính làm những gì chúng ta muốn bằng cách viết ra ngôn ngữ mà nó hiểu được, đó chính là những dòng code. Giả định trong đầu là bạn viết 1 chương trình nào đó, rồi có 1 người khác thay đổi 1 chức năng nhỏ trong chương trình, anh ta mất khoảng 1 tuần mới hoàn thành xong công việc, tuy nhiên với bạn thì mất có vài giờ vì bạn hiểu nhanh hơn code bạn viết ra.(Câu chuyện bịa nhưng tương đồng với ý tác giả). Vấn đề ở đây là tôi chỉ cố gắng làm cho chương trình chạy được mà không nghĩ đến 1 người nào khác sau này sẽ phát triển tiếp ứng dụng. Đến lúc cần có sự thay đổi để làm cho code dễ hiểu hơn. Refactoring làm cho code của tôi trở lên dễ đọc hơn. Trước khi refactoring, tôi viết chương trình sao cho chạy được mà không theo 1 cấu trúc nào trước đó cả. Dành 1 chút thời gian cho refactoring làm cho dòng code có tính giao tiếp hơn, đây chính là điều mà tôi muốn nói.

Tôi không bao che cho mình, nhiều khi người phát triển ứng dụng sau này cũng chính là tôi. Điều này cho thấy refactoring trở lên quan trọng. Tôi là 1 lập trình viên rất lười biếng. Một trong những điều lười biếng của tôi là không bao giờ nhớ gì về những dòng code mình viết ra. Tôi để mình không phải nhớ bất kỳ điều gì mà tôi có thể tìm hiểu, tôi sợ bộ não của tôi sẽ đầy mất. Tôi cố gắng để mọi thứ tôi cần nhớ vào trong code vì thế tôi không cần phải nhớ. Theo cách đó tôi ít thấy căng thẳng hơn. Ý tác giả muốn nhấn mạnh là khi viết code cần để code tự giải thích tất cả mà bản thân người viết không phải ghi nhớ nhiều.

### Refactoring giúp tôi tìm kiếm bugs.
