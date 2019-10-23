/*** Tác giả nói rằng
 * khi ông ta refector 1 đoạn function dài như trong ví dụ này thì ông sẽ xác định xem chức năng của từng đoạn code
 * là gì để có thể tách chúng ra, như trong đoạn code này, ông ta thấy rằng chúng dùng để tính toán.
 * Cách để hiểu đoạn code đó làm gì là cho chúng vào 1 function với tên function tướng ứng với chức năng 
 * của đoạn code đó, ví dụ như: amountFor(aPerformance).
 * Đây là kỹ thuật Extract Function.
 */
switch (play.type) {
    case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
            thisAmount += 1000 * (perf.audience - 30);
        }
        break;
    case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
            thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
    default:
        throw new Error(`unknown type: ${play.type}`);
}

/**
 * Đầu tiên ông ta tìm kiếm các biến, tham số trong đoạn code đó, Ở đây tìm thấy 3 biến: perf, play và thisAmount.
 * 2 biến đầu tiên thì k bị thay đổi trong cả quá trình xử lý, vì thế có thể coi chúng như những parameter.
 * biến còn lại, ta thấy giá trị tính toán được gán lại cho biến trong quá trình xử lý, vì thế ta có thể khởi tạo biến đó trong cope và return biến đó,
 * trông như sau:
 */
function amountFor(perf, play) {
    let thisAmount = 0;
    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

/**
 * Bây giờ ta có code mới nhìn ngon hơn,
 * Sau khi thay đổi code, ông ta chạy thử xem có vấn đề gì không, đây là 1 thói quen quan trọng sau mỗi lần refactor.
 * Việc testing sau mỗi lần thay đổi giúp bạn kiểm soat code mình tốt hơn, nếu gặp phải lỗi thì có thể fix ngay được
 */
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

/** Refactor chương trình từng bước nhỏ, nếu gặp phải vấn đề gì thì bạn có thể dễ dàng tìm kiếm để fix **/


/**
 * Tiếp theo sẽ là bước làm cho code clean hơn
 * Ông ta tiếp tục sử dụng Extract Function, và nhìn lại đống code mà ông ta tách ra, xem có chỗ nào có thể làm cho clean hơn đc ko.
 * Đầu tiên ông ta thấy rằng cần rename các biến để cho dễ hiểu hơn, như thay đổi thisAmount thành result
 */
function amountFor(perf, play) {
    let result = 0;
    switch (play.type) {
        case "tragedy":
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 10000 + 500 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}

/**
 * Ông ta nói trong coding standard của ông ta luôn gọi return trong function để trả về 1 kết quả, điều đó cho biết rằng vai cho của function đó là gì.
 * Tiếp theo thay đổi argument đầu tiên:
 */
function amountFor(aPerformance, play) {
    let result = 0;
    switch (play.type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}

/**
 * Js là dynamically typed language - nghĩa là có thể tùy biến, theo codeing style của ông ta, ông ta sẽ dùng những tên định danh cho tới khi có 1 cái tên xác định rõ thông tin cần miêu tả.
 * Ông ta học convention này từ Kent Beck (Beck SBPP).
 * Good code là code mà khi người ta đọc vào là biết nó đang làm cái gì và đặt tên cho biến dễ hiểu cũng là cách để làm cho code clear hơn.
 */

/**
 * Removing biến play.
 * Tôi xem xét các biến trong function amountFor và nhìn xem chúng đến từ đâu.
 * aPerformance được tạo ra thông qua biến khởi tạo của vòng lặp, điều tất nhiên giá trị của biến đó sẽ thay đổi qua mỗi lần lăp.
 * Biến play được tính toán từ biến khởi tạo perf, vì thế không cần phải truyền nó như 1 parameter vào mỗi lần chạy của vòng lặp,
 * tôi có thể tính toán lại nó trong hàm amountFor.
 * Khi tôi chia nhỏ đoạn function dài, tôi muốn loại bỏ những biến như play, bởi vì tạo ra nhiều biến tạm thời trong phạm vi scope sẽ làm việc chia tách code trở lên phức tạp.
 * Kỹ thuật tôi dùng ở đây là Replace Temp with Query 
 */
function playFor(aPerformance) {
    return plays[aPerformance.playID];
}
// Đoạn code mới trong như sau:
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
        const play = playFor(perf);
        let thisAmount = amountFor(perf, play);
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

/**
 * Tiếp theo tôi dùng kỹ thuật Inline Variable
 */
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
        // const play = playFor(perf);
        let thisAmount = amountFor(perf, playFor(perf));
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

/**
 * Với việc sử dụng Inline Variable, tôi có thể vận dụng kỹ thuật Change Function Declaration cho function amountFor để xóa đi tham số play, tôi làm điều này trong 2 bước
 * Đầu tiên sử dụng funtion mới tách ra bên trong funtion amountFor
 */
function amountFor(aPerformance, play) {
    let result = 0;
    switch (playFor(perf).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playFor(perf).type}`);
    }
    return result;
}
/**
 * Sau đó xóa đi tham số play trong hàm amountFor và playFor(perf) trong dòng let thisAmount = amountFor(perf, playFor(perf)) của hàm statement.
 * Ở nhũng lần trước biến play được execute 1 lần ở mỗi lần lặp, nhưng bây giờ, nó đc execute tới 3 lần. Tôi sẽ bàn về sự ảnh hưởng sau.
 * Tôi quan sát rằng không ảnh hướng quá đáng kể tới performance.
 * Nếu như nó có ảnh hưởng thì cũng dễ dàng hơn để cải thiện về mặt performance.
 * Lợi ích to của việc loại bỏ biến local là dễ dàng chia tách hơn, từ đó sẽ ko phải xử lý biến local nhiều. Thực ra tôi thường loại bỏ
 * những local variable trước khi tôi bắt đầu phân tách bất cứ đoạn code nào.
 * Bây giờ tôi đã hoàn thành với việc truyền argument cho hàm amountFor, tôi quay lại quan sát vào hàm statement gọi lại hàm amountFor,
 * tôi sử dụng kỹ thuật Inline Variable cho các biến tạm thời, những loại biến này thường ko dc update hay gán lại trong quá trình xử lý, trong
 * trường hợp này là cho biến thisAmount.
 */
function amountFor (aPerformance) {
    // code here
}
function statement (invoice) {
    // code here
    let thisAmount = amountFor(perf);
    // code here
} 
function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

// Extracting Volume Credits - page 14