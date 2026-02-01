from PIL import Image

def make_transparent(image_path, output_path, threshold=230):
    # Mở ảnh và chuyển sang chế độ RGBA (có kênh alpha)
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # item là một tuple (R, G, B, A)
        # Nếu R, G, B đều lớn hơn threshold (gần trắng)
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            # Thay thế bằng pixel trong suốt hoàn toàn
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    # Cập nhật dữ liệu mới và lưu ảnh
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Xử lý xong! Ảnh lưu tại: {output_path}")

# Chạy xử lý
make_transparent("resources/gate.png", "resources/gate_transparent.png")