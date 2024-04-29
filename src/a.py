options = Options()

options.add_argument("start-maximized")
options.add_experimental_option("excludeSwitches", ["enable-automation"])  # Otomasyon uyarısını kaldırır.
options.add_experimental_option('useAutomationExtension', False)
service = Service()



while True:
    try:
        driver = webdriver.Chrome(service=service, options=options)
        url = "https://www.amazon.com.tr/s?i=stripbooks&bbn=12466380031&rh=n%3A12466380031%2Cp_85%3A21345931031%2Cp_98%3A21345978031&dc&ds=v1%3A3VwZF9weciTJZ98Irqp5a%2FvqMhdoS3ALUR%2BCl%2BTP3zY&qid=1710167442&rnid=21345970031&ref=sr_nr_p_98_1"
        driver.get(url)
        break
    except SessionNotCreatedException as e:
        print("### TÜM AÇIK CHROME UYGULAMALARINI KAPATIN VE TEKRAR DENEYİN ###")
        input(">>> Denemek için ENTER tuşuna basın")


kategori = driver.find_elements(By.XPATH, "//*[@id='departments']/ul/span/span/li")
print(kategori)
for element in kategori[2:]:
    a_element = element.find_element(By.TAG_NAME, "a")
    href = a_element.get_attribute('href')
    print(href)
    # Yeni bir sekme açmak için JavaScript kullanarak sayfayı açın
    driver.execute_script("window.open(arguments[0]);", href)

    # Yeni açılan sekme arasında geçiş yapın
    driver.switch_to.window(driver.window_handles[1])

    # Başlık bilgisini alın ve yazdırın
    print(driver.title)

    # Diğer işlemleri yapabilirsiniz

    # Bir sonraki sayfaya geçmek için mevcut sekmeden çıkın
    driver.close()

    # # Ana sekmeye geri dönün
    driver.switch_to.window(driver.window_handles[0])

input()