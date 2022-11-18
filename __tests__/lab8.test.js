describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/Lab8_Starter/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);

    // For loop to iterate through all 20 items
    for (let ind = 0; ind < prodItems.length; ind++) {


      // Grab the .data property of <product-items> to grab all of the json data stored inside
      data = await prodItems[ind].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }

    }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    const shad = await page.$("product-item")
    const shadow = await shad.getProperty("shadowRoot")
    const but = await shadow.$("button")
    await but.click ()
    const innerText = await but.getProperty ("innerText")
    let value = await innerText.jsonValue()
    expect (value).toBe('Remove from Cart')
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20
    const allItems = await page.$$ ('product-item'); 

    for (let ind = 1; ind < allItems.length; ind++) {
      let shawdow3 = await allItems[ind].getProperty ('shadowRoot'); 
      let but3 = await shawdow3.$('button'); 
      await but3.click (); 
    }

    let cartCount = await page.$ ("#cart-count")
    let cartCountIn = await cartCount.getProperty ('innerText')
    let actualCount = await cartCountIn.jsonValue ()
    expect (actualCount).toBe ('20');

  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20
    await page.reload (); 
    const allItems4 = await page.$$ ('product-item'); 
    
    let allRMC = true; 

    for (let ind = 0; ind < allItems4.length; ind++) {
      let shad4 = await allItems4 [ind].getProperty ('shadowRoot'); 
      // console.log (shad4); 
      let but4 = await shad4.$('button')
      let innerT4 = await but4.getProperty ('innerText'); 
      let value4 = await innerT4.jsonValue (); 

      if (value4 != "Remove from Cart") {
        allRMC = false; 
      }
    }

    let cartCount4 = await page.$("#cart-count")
    let cartCountIn4 = await cartCount4.getProperty ("innerText")
    let actualCount4 = await cartCountIn4.jsonValue (); 
    expect (allRMC).toBe (true)
    expect (actualCount4).toBe ("20"); 
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is

    // let cart5 = localStorage.getItem ('cart')
    const localStorage = await page.evaluate(() => {
      return localStorage.getItem ('cart')
    })
    // console.log (cart5)
    // let value5 = cart5.toString
    expect (localStorage).toBe ('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]')
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    const allItems6 = await page.$$ ('product-item'); 

    // click everyone of them
    for (let ind = 0; ind < allItems6.length; ind ++) {
      let shad6 = await allItems6 [ind].getProperty ('shadowRoot'); 
      let but6 = await shad6.$ ("button")
      await but6.click ()
    }

    // Check cart count 
    let cartCountObj6 = await page.$ ('#cart-count')
    let cartCount6 = await cartCountObj6.getProperty ('innerText')
    let cartCountNum6 = await cartCount6.jsonValue ()

    expect (cartCountNum6).toBe ("0")

  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0

    await page.reload (); 

    // bool to check
    let allRM = true

    // all items 
    // const allItems6 = await page.$$ ('product-item'); 
    const allItems7 = await page.$$ ('product-item')

    // Loop through each to check 
    for (let ind = 0; ind < allItems7.length; ind ++) {
      let shad7 = await allItems7 [ind].getProperty ('shadowRoot')
      let but7 = await shad7.$ ('button')
      let butText7 = await but7.getProperty ('innerText')
      let value = await butText7.jsonValue ()

      // check if same word 
      if (value != "Add to Cart") {
        allRM = false
      }
    }

    // Check cart count 
    let cartCountObj7 = await page.$ ('#cart-count')
    let cartCount7 = await cartCountObj7.getProperty ('innerText')
    let cartCountNum7 = await cartCount7.jsonValue ()

    // check excpect 
    expect (allRM).toBe (true)

    expect (cartCountNum7).toBe ("0")


  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is

    const localStorage8 = await page.evaluate (() => {
      return localStorage.getItem ('cart')
    })
    expect (localStorage8).toBe ('[]')
  });
});
